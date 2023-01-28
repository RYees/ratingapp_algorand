from pyteal import *
from beaker import *
# import os
# import json
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
    #     rate = Bytes("rate")
        # tip = Bytes("tip")

    @external
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
    
    # @external
    # def tip(self, amount: abi.Uint64):
    #     count = Txn.application_args[1]
    #     valid_number_of_transactions = Global.group_size() == Int(2)

    #     valid_payment_to_seller = And(
    #         Gtxn[1].type_enum() == TxnType.Payment,
    #         Gtxn[1].receiver() == Global.creator_address(),
    #         Gtxn[1].amount() == amount.get(),
    #         Gtxn[1].sender() == Gtxn[0].sender(),
    #     )

    #     can_tip = And(valid_number_of_transactions,
    #                   valid_payment_to_seller)

    #     state_value = 'Successfully tipped'

    #     return If(can_tip).Then(state_value).Else(Reject())
    
    # @external
    # def rate(self):
    #     count = Txn.application_args[1]
    #     valid_number_of_transactions = Global.group_size() == Int(2)

    #     valid_payment_to_seller = And(
    #         Gtxn[1].type_enum() == TxnType.Payment,
    #         Gtxn[1].receiver() == Global.creator_address(),
    #         Gtxn[1].amount() == App.globalGet(self.Variables.price) * Btoi(count),
    #         Gtxn[1].sender() == Gtxn[0].sender(),
    #     )

    #     can_buy = And(valid_number_of_transactions,
    #                   valid_payment_to_seller)

    #     update_state = Seq([
    #         App.globalPut(self.Variables.rating, App.globalGet(self.Variables.rating.increment())),
    #         Approve()
    #     ])

    #     return If(can_buy).Then(update_state).Else(Reject())

    # @external
    # def application_deletion(self):
    #     return Return(Txn.sender() == Global.creator_address())
    
    @external
    def app_start(self):
        return Cond(
            [Txn.application_id() == Int(0), self.app_creation()],
            # [Txn.on_completion() == OnComplete.DeleteApplication, self.application_deletion()],
            # [Txn.application_args[0] == self.AppMethods.rate, self.rate()],
            # [Txn.application_args[1] == self.AppMethods.tip, self.tip()]
        )

 ################
    # Read Methods #
    ################
    
    # @external(read_only=True, authorize=Authorize.only(Global.creator_address()))
    # def read_rsvp(self, *, output: abi.Byte):
    #     """Read amount of RSVP to the event. Only callable by Creator."""
    #     return output.set(self.Variables.rating)
    
    # @external(read_only=True)
    # def read_price(self, *, output: abi.Byte):
    #     """Read amount of RSVP to the event. Only callable by Creator."""
    #     return output.set(self.Variables)


if __name__ == "__main__":
    import os
    import json

    path = os.path.dirname(os.path.abspath(__file__))

    rating = Rating()

    # Dump out the contract as json that can be read in by any of the SDKs
    # with open(os.path.join(path, "contract.json"), "w") as f:
    #     f.write(json.dumps(rating.application_spec(), indent=2))

    # Write out the approval and clear programs
    with open(os.path.join(path, "approval.teal"), "w") as f:
        f.write(rating.approval_program)

    with open(os.path.join(path, "clear.teal"), "w") as f:
        f.write(rating.clear_program)
