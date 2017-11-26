from flask import Flask
from livereload import Server

from blueprints.example1.controllers import example1
from blueprints.example2.controllers import example2

# App Configuration
app = Flask(__name__, static_folder='./blueprints/common/static')

app.register_blueprint(example1, url_prefix='/example1')
app.register_blueprint(example2, url_prefix='/example2')

app.debug = True
app.config['SECRET_KEY'] = 'blah'

server = Server(app.wsgi_app)
server.serve()
