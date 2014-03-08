require 'sinatra'

set :public_folder, '.'

get '/' do
  redirect('index.html')
end

get '/all.js' do
  content_type :js
  javascripts.join("\n")
end

get '/templates.js' do
  content_type :js
  templates.join("\n")
end

get '/tests.js' do
  content_type :js
  Dir['test/**/*_test.js'].map do |file|
    File.read(file)
  end.join("\n")
end

def javascripts
  ['vendor/jquery.js', 'vendor/handlebars.js', 'vendor/ember.js',
    'vendor/bootstrap.js', 'vendor/remotestorage.js', 'vendor/underscore.js', 'storage.js',
    'app.js', 'models.js', 'controllers.js', 'routes.js'].map do |file|
    File.read("js/#{file}")
  end
end

def templates
  Dir['templates/**/*.hbs'].map do |file|
    <<-JS
      Ember.TEMPLATES = Ember.TEMPLATES || [];
      Ember.TEMPLATES['#{File.basename(file, '.hbs')}'] = Ember.Handlebars.compile('#{File.read(file).gsub("\n", '').gsub("'", "\\\\'")}');
    JS
  end
end
