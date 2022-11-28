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
