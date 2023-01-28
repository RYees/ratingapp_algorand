from pyteal import *
from beaker import *
import os
import json
from typing import Final

class Rating(Application):
    # owner: Final[ApplicationStateValue] = ApplicationStateValue(
    #     stack_type=TealType.bytes, default=Global.creator_address()
    # )
     # products: bytes
    # products: Final[ApplicationStateValue] = ApplicationStateValue(
    #     stack_type=TealType.bytes, default=Bytes("")
    # )

    # # 2 Global Bytes
    # # rating: Bytes
    # ratings: Final[ApplicationStateValue] = ApplicationStateValue(
    #     stack_type=TealType.uint64, default=Int(0)
    # )
    # usersphone: uint 64
    # usersphone: Final[ApplicationStateValue] = ApplicationStateValue(
    #     stack_type=TealType.uint64, default=Int(0)
    # )

    class Variables:
        name = Bytes("NAME")
        image = Bytes("IMAGE")
        description = Bytes("DESCRIPTION")
        price = Bytes("PRICE")
        rating = Bytes("RATE")

    # class AppMethods:
    #     buy = Bytes("buy")
    def app_creation(self):
        return Seq([
            Assert(Txn.application_args.length() == Int(4)),
            Assert(Txn.note() == Bytes("product-rating:uv1")),
            Assert(Btoi(Txn.application_args[3]) > Int(0)),
            App.globalPut(self.Variables.name, Txn.application_args[0]),
            App.globalPut(self.Variables.image, Txn.application_args[1]),
            App.globalPut(self.Variables.description, Txn.application_args[2]),
            App.globalPut(self.Variables.price, Btoi(Txn.application_args[3])),
            App.globalPut(self.Variables.rating, Int(0)),
            Approve()
        ])

