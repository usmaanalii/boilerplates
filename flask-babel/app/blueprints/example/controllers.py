from flask import Blueprint, request, redirect, render_template, flash
from helpers import decimal_serializer, MyEncoder

# Register blueprint
example = Blueprint('example', __name__,
                    static_folder='./static',
                    template_folder='./templates')


#######
# VIEWS
#######
@example.route('/', methods=['GET'])
def example_home_view():
    return render_template('index.html')
