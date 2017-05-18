# RDMA Spider-man Homecoming Web Carpet Sweepstakes

####What does it do?
This boilerplate is set up to increase my workflow. Hopefully, this can also help you on your way.
Follow the deployment instructions below to deploy to heroku.
There is also a partial/template for meta info on most social networks.

####Technologies Used
* Ruby
* Middleman 3
* ERB
* HTML5
* CSS3
* SASS
* jQuery
* Font Awesome
* Minify HTML gem

####Getting Started
```shell
git clone https://github.com/mqschwanda/TSM-Spider-Man-Sweepstakes.git
git init
# The git remote set-url command changes an existing remote repository URL.
git remote set-url origin https://github.com/mqschwanda/TSM-Spider-Man-Sweepstakes.git
# Adds the files in the local repository and stages them for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'.
git add .
# Commits the tracked changes and prepares them to be pushed to a remote repository. To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.
git commit -m "Upload to github"
# Pushes the changes in your local repository up to the remote repository you specified as the origin
git push -u origin master
```

From the `TSM-Fan-Fair-Sweepstakes` directory, install the gems by running the following:
```shell
bundle install
```

To fire up the server while in the `TSM-Fan-Fair-Sweepstakes` directory use this command:
```shell
bundle exec middleman s & ruby localtunnel.rb --port 4567 --subdomain start
```

If you are having issues with livereload not working fire up the server using:
```shell
middleman s --force-polling --verbose
```

To kill the server use "ctrl+c"

If you find yourself curious as to what directory you are in use the following in terminal:
```shell
pwd
```
It should turn up `TSM-Fan-Fair-Sweepstakes`

####Deploy
This step requires a heroku account

Create an app (Run Once)
```shell
heroku create <<MYAPP>>
```

Deploying (Every deploy)
```shell
git push heroku master
```

####Middleman Helper Methods

Create an external link:
```html
<%= link_to 'My Site', 'http://mysite.com' %>
```

Create an internal link:
```html
<%= link_to 'About', '/about.html' %>
```

Link / Image tag for image in images folder:
```html
<% link_to 'http://mysite.com' do %>
  <%= image_tag 'mylogo.png' %>
<% end %>
```

Create a form (example):
```html
<% form_tag '/destroy', :class => 'destroy-form', :method => 'delete' do %>
  <% field_set_tag do %>
    <p>
      <%= label_tag :username, :class => 'first' %>
      <%= text_field_tag :username, :value => params[:username] %>
    </p>
    <p>
      <%= label_tag :password, :class => 'first' %>
      <%= password_field_tag :password, :value => params[:password] %>
    </p>
    <p>
      <%= label_tag :strategy %>
      <%= select_tag :strategy, :options => ['delete', 'destroy'],
          :selected => 'delete' %>
    </p>
    <p>
      <%= check_box_tag :confirm_delete %>
    </p>
  <% end %>
  <% field_set_tag(:class => 'buttons') do %>
    <%= submit_tag "Remove" %>
  <% end %>
<% end %>
```

Text helpers for dummy info:

USAGE:
```html
<%= lorem.sentences 5 %>
```

DIFFERENT METHODS:
```ruby
lorem.sentence      # returns a single sentence
lorem.words 5       # returns 5 individual words
lorem.word
lorem.paragraphs 10 # returns 10 paragraphs
lorem.paragraph
lorem.date          # accepts a strftime format argument
lorem.name
lorem.first_name
lorem.last_name
lorem.email
```

Placeholder Images:

USAGE:
```html
<%= lorem.image('300x400') %>
```

DIFFERENT METHODS:
```ruby
lorem.image('300x400')
  #=> http://placehold.it/300x400
lorem.image('300x400', :background_color => '333', :color => 'fff')
  #=> http://placehold.it/300x400/333/fff
lorem.image('300x400', :random_color => true)
  #=> http://placehold.it/300x400/f47av7/9fbc34d
lorem.image('300x400', :text => 'blah')
  #=> http://placehold.it/300x400&text=blah
```
