from flask import Flask
from livereload import Server

from blueprints.charts.controllers import charts

# App Configuration
app = Flask(__name__, static_folder='./blueprints/common/static')

app.register_blueprint(charts, url_prefix='/charts')

app.debug = True
app.config['SECRET_KEY'] = 'blah'

server = Server(app.wsgi_app)
server.serve()
