#stat!
Tool to handle markdown/html/etc for a personal website. Minimizing (1) distance from content (md) to publishing (html) and (2) maintenance/overhead.

#usage

	npm install stat-bang

Then:

	var statBang = require('stat-bang');
	statBang.start(80);


##API

###One folder

Here's a principle that this project goes by: your public folder is your src folder.

###Directory structure

	joesul.li
		node_modules
			stat-bang
		server.js
		van
			content
				readme
					index.md
		template.html

Now, visiting http://joesul.li/van/content/readme will serve index.md, rendered to html and inserted into template.html

###Example + Templating

Markdown is a great way to compose in HTML-land, but it's not the whole shebang. So, when the site is rendered, it looks for the nearest template.html ancestor and injects the markdown into it. Check it out:

	/content
		/hello
			index.md
			template.html

index.md looks like:

	#hi

template.html looks like:

	<html>
		<!-- content -->
	</html>

So,

	node server.js &
	cat http://joesul.li/van/content/hello

	>	<html>
	>	<h1>hi</h1>
	>	</html>


###That's it

Ok, that's enough to get started!
