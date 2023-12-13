restful constraints (theory constructs)

client-server architecture
-> seapration of concerns. restful should not care about ui

stateless
-> no client-context (e.g. session) is stored on server. independent from client.

cacheability
-> responses must define themselves as cacheable or non-cacheable

layered system
-> intermediate servers maybe used without the client knowing about it

uniform interface
-> resources are identified in requests, transferred data is decoupled from db schema
-> self descriptive messages links to further resources

code on demand (optional)
-> executable code could be transferred
