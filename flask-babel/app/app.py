from flask import Flask
from blueprints.balls.controllers import charts

# App Configuration
app = Flask(__name__,
            static_folder='./blueprints/common/static',
            template_folder='./blueprints/common/templates')

app.register_blueprint(charts, url_prefix='/charts')

app.config['SECRET_KEY'] = 'blah'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
