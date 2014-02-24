window.helloWorld = ->
	"Hello world!"

window.disemvowel = (str) ->
	str.replace /a|e|i|o|u/gi, ""