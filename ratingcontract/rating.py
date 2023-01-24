from pyteal import *
from beaker import *
import os
import json
from typing import Final

class Rating(Application):
    owner: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes, default=Global.creator_address()
    )owner