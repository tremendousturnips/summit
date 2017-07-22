/
/api

/api/profiles  GET all profiles
/api/profiles/:id GET profile meta  PUT profile
/api/profiles/:id/rooms GET rooms meta for profile
/api/profiles/:id/friends GET friends meta for profile TODO
/api/profiles/:id/directs GET other users meta for directs with profile TODO
/api/profiles/:id/directs/:to_user_id/messages GET direct messages between profile id and to_user_id

/api/rooms/:id/users  GET users in room
/api/rooms/:id/channels  GET channels in room
/api/rooms/:id/channels/:channel_id/messages  GET messages in channel

/api/messages  POST message  PUT message TODO

/api/roles POST role  PUT role TODO
