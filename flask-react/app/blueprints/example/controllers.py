from flask import Blueprint, make_response, render_template
from helpers import decimal_serializer, MyEncoder

# Register blueprint
example = Blueprint('example', __name__,
                    static_folder='./static',
                    template_folder='./templates')


#######
# VIEWS
#######
# @example.route('/', methods=['GET'])
# def example_home_view():
#     return render_template('index.html')

@example.route('/', defaults={'path': 'example/'})
@example.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')
