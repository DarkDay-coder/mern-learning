##

MONGO DATA MODELING
data modeling is the most crucial part during the entire application development

###

DATA MODELING CAN BE SIMPLIFIED WITH FOLLOWING IDEAL STEPS

1. identify the relationship between data
2. Referencing/Normalization vs. embedding/denormalization
3. embedding or referenccing to other documents
4. types of referencing

###

1. one-one relationship
2. one-many relationship
3. many-many relationship

###

1. one movie can only have one name
2. a. one-few => 1 movie can receive few awards
   b. one-many => 1 movie can have hundreds or thousands of review
   c. one-tons => a single application can have millions of simultaneous logins
3. a movie can have multiple cast and each cast may be playing in multiple movies simultaneously

###

Referencing vs embedding
image("./public/images/ref-vs-emb.png")

###

when to use which case

1. look for relatonship types
2. look for data access pattern
3. look for data closeness (how much the data are related to each other)

###

1. a. for one-few and one-many (embedding)
   b. for one-many, one-tons and many-many (referenccing)
2. a. data is mostly read only, data doesn't change frequently, high r/w ratio (embedding)
   b. data is updated a lot, low r/w ratio (referenccing)
3.

###

types of referencing

1. child referencing
2. parent referenccing
3. two-way referenccing

###

referencing demonstration
image('./public/images/referencing.png')

####
