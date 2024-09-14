
import aiohttp

homeserver = "https://matrix.org"
username = "@nanaji:matrix.org"  
password = "Nani@4501"           
room_id = "!nGBLxaDLXCDiWyTwzq:matrix.org"  

async def send_message(message):
    async with aiohttp.ClientSession() as session:
    
        login_payload = {
            "type": "m.login.password",
            "user": username,
            "password": password
        }

        
        async with session.post(f"{homeserver}/_matrix/client/r0/login", json=login_payload) as login_response:
            if login_response.status != 200:
                print(f"Login failed: {login_response.status}")
                return login_response.status
            
           
            login_data = await login_response.json()
            access_token = login_data.get("access_token")
            if not access_token:
                print("No access token received.")
                return 401

            print(f"Logged in with access token: {access_token}")

         
            message_payload = {
                "msgtype": "m.text",
                "body": message
            }

          
            async with session.post(
                f"{homeserver}/_matrix/client/r0/rooms/{room_id}/send/m.room.message?access_token={access_token}",
                json=message_payload
            ) as message_response:
                if message_response.status == 200:
                    print("Message sent successfully!")
                else:
                    print(f"Failed to send message: {message_response.status}")
                return message_response.status


async def get_messages():
    async with aiohttp.ClientSession() as session:
        login_payload = {
            "type": "m.login.password",
            "user": username,
            "password": password
        }

        async with session.post(f"{homeserver}/_matrix/client/r0/login", json=login_payload) as login_response:
            if login_response.status != 200:
                print(f"Login failed: {login_response.status}")
                return []
            
            login_data = await login_response.json()
            access_token = login_data.get("access_token")
            if not access_token:
                print("No access token received.")
                return []

            print(f"Logged in with access token: {access_token}")

            
            async with session.get(
                f"{homeserver}/_matrix/client/r0/rooms/{room_id}/messages?access_token={access_token}&limit=10&dir=b"
            ) as messages_response:
                if messages_response.status == 200:
                    messages_data = await messages_response.json()
                    print("Messages data:", messages_data)
                    grouped_messages = []  
                    
                    for event in messages_data.get('chunk', []):
                        if event.get('type') == "m.room.message":
                            contact = "Unknown" 
                            grouped_messages.append({
                                'body': event.get('content', {}).get('body', 'No content'),
                                'platform': 'Matrix'
                            })
                    
                    return grouped_messages
                else:
                    print(f"Failed to fetch messages: {messages_response.status}")
                    return []

