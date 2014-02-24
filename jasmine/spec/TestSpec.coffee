describe "Hello world", ->
	it "say world", ->
		(expect helloWorld()).toContain "world"

describe "Hello world", ->
	it "say world", ->
		(expect helloWorld()).toEqual "Hello world!"

describe "Disemvoweler", ->
	it "should remove all lowercase vowels", ->
		(expect disemvowel "Hello world").toEqual "Hll wrld"
	it "should remove all uppercase vowels", ->
		(expect disemvowel "Artistic Eagle").toEqual "rtstc gl"
	it "shouldn't change empty strings", ->
		(expect disemvowel "").toEqual ""
	it "shouldn't change strings with no vowels", ->
		(expect "Mhmm").toEqual "Mhmm"