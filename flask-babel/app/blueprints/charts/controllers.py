from flask import Blueprint, request, redirect, render_template, flash
from helpers import decimal_serializer, MyEncoder

# Register blueprint
charts = Blueprint('charts', __name__,
                    static_folder='./static',
                    template_folder='./templates')


#######
# VIEWS
#######
@charts.route('/', methods=['GET'])
def charts_home_view():
    return render_template('index.html')
