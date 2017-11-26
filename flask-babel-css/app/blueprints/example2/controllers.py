from flask import Blueprint, request, redirect, render_template, flash
from helpers import decimal_serializer, MyEncoder

# Register blueprint
example2 = Blueprint('example2', __name__,
                     static_folder='./static',
                     template_folder='./templates')


#######
# VIEWS
#######
@example2.route('/', methods=['GET'])
def example1_home_view():
    return render_template('example2-index.html')
