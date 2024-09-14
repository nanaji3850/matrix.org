from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio
from collections import defaultdict
from matrix_bot import send_message, get_messages  

app = Flask(__name__)
CORS(app)

# Home route
@app.route('/')
def home():
    return "Welcome to the Messaging Dashboard API"

# Route for sending a message
@app.route('/send_message', methods=['POST'])
def send_message_route():
    data = request.json
    message = data['message']
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        status = loop.run_until_complete(send_message(message))
    finally:
        loop.close()
    if status == 200:
        return jsonify({"status": "Message sent successfully!"})
    else:
        return jsonify({"status": "Failed to send message", "error_code": status})

# Route for retrieving messages
@app.route('/get_messages', methods=['GET'])
def get_messages_route():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        messages = loop.run_until_complete(fetch_messages_with_origin())
    finally:
        loop.close()
    return jsonify({"messages": messages if isinstance(messages, list) else []})

# Route for summarizing messages
@app.route('/summarize_messages', methods=['GET'])
def summarize_messages_route():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        messages = loop.run_until_complete(get_messages())
    finally:
        loop.close()
    
    # Count the number of messages
    message_count = len(messages)
    
    return jsonify({
        "message_count": message_count,
        "summary": f"There are {message_count} messages in the room."
    })

# Route for retrieving detailed messages by contact ID
@app.route('/get_detailed_messages/<contact_id>', methods=['GET'])
def get_detailed_messages_route(contact_id):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        detailed_messages = loop.run_until_complete(fetch_detailed_messages(contact_id))
    finally:
        loop.close()
    return jsonify({"messages": detailed_messages if isinstance(detailed_messages, list) else []})

# Function to fetch detailed messages for a contact
async def fetch_detailed_messages(contact_id):
    
    messages = await get_messages() 
    
   
    detailed_messages = [msg for msg in messages if msg.get('sender') == contact_id]

    return detailed_messages

# Route for replying to a message
@app.route('/reply_message', methods=['POST'])
def reply_message_route():
    data = request.json
    reply = data['reply']
    contact_id = data['contact_id']
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        status = loop.run_until_complete(send_reply(reply, contact_id))
    finally:
        loop.close()
    if status == 200:
        return jsonify({"status": "Reply sent successfully!"})
    else:
        return jsonify({"status": "Failed to send reply", "error_code": status})

# Function to send a reply message
async def send_reply(reply, contact_id):
    
    return await send_message(reply)  

async def fetch_and_consolidate_messages():
    messages = await get_messages_with_origin()

  
    consolidated_messages = defaultdict(list)

    for msg in messages:
        contact_id = msg.get('sender') 
        platform = msg.get('platform', 'unknown') 
        msg['platform'] = platform  
        consolidated_messages[contact_id].append(msg)

    
    return [{"contactId": contact_id, "messages": msgs} for contact_id, msgs in consolidated_messages.items()]

# Modify the get_messages to include platform metadata
async def fetch_messages_with_origin():
 
    messages = await get_messages()

 
    for msg in messages:
        msg['platform'] = msg.get('platform', 'unknown')  

    return messages

if __name__ == "__main__":
    app.run(debug=True)
