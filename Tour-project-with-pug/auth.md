Its all about user login in and signing up, accessing pages based on their roles

we use bcryptJs for password hashing

now we will use jwt or json web token for authorizing the user.

we can use session on server for authorization as well but this approach is against REST API i.e. stateless approach.

###

WORKING OF JWT

1. client hit login with valid credentials
2. a unique jwt is send back to the client as a response by server
3. client store that token in local storage or cookies
4. client request for some stuff that is accessProtected using the jwt
5. server look for jwt and if valid server response with the stuff that client is requesting

####

Authorization

it is a process of allowing only user with certain role to perform certain action.
we need to check whether the logged in user has access to perform certain action or not.

###

Authentication

###

Security

Password reset function

1. user sent forget password req with their email address
2. create a reset token and send back to the email address provided
3.

we can enter into system with password only {{{email: {$gt: ""}}}}
the email expression becomes true always hence need data sanitization
to avoid this we use express-mongo-sanitize package

xss package to avoid data with html codes

###

to avoid parameter polution we use hpp package (http parameter polution)
parameter polution is simply making the app down coz of query on url
