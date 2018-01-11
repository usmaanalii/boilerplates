import MySQLdb
import decimal
import json
import datetime
from time import mktime

from config import db_credentials


# Used to reconnect after each query
def prepare_for_db_call(dict_cursor=False):
    # Open database connection
    db = MySQLdb.connect(host=db_credentials['host'],
                         user=db_credentials['user'],
                         passwd=db_credentials['passwd'],
                         db=db_credentials['db'],
                         port=db_credentials['port'],
                         charset='utf8')

    # Creating a cursor object
    cursor = db.cursor(MySQLdb.cursors.DictCursor) if dict_cursor else db.cursor()  # noqa
    return cursor, db


class MyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return int(mktime(obj.timetuple()))

        return json.JSONEncoder.default(self, obj)


def decimal_serializer(obj):
    """
    Converts a Decimal object to a float, preventing the json_dumps()
    method from breaking when returning data from the database

    Parameters
    ----------
    obj : Decimal
        takes in a Decimal object e.g Decimal('36'), this is available from
        the decimal package (from decimal import Decimal)

    Returns
    -------
    float

    Example
    -------
        x = decimal_serializer(Decimal('36'))
        print(x)  # 36.0
    """
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError
