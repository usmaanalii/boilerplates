from flask import Flask
from livereload import Server

from blueprints.example.controllers import example

# App Configuration
app = Flask(__name__, static_folder='./blueprints/common/static')

app.register_blueprint(example, url_prefix='/example')

app.debug = True
app.config['SECRET_KEY'] = 'blah'

server = Server(app.wsgi_app)
server.serve()
