import { Transaction } from "@/app/lib/definitions";
import { formatTimestamp } from "@/app/lib/utils";

export default async function LatestsTransactions({transactions} : {transactions: Transaction[]}) {
    return (
      <div className="mt-6 flow-root text-white">
       {transactions.length == 0 ? <div>No hay transacciones</div> :
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg p-2 md:pt-0 border border-gray-200 bg-gray-800 shadow-sm">
            <div className="lg:hidden border-b pb-3 bg-gray-800">
              <div>
                <p className="text-xl font-bold text-center">
                Latests transactions
                </p>
              </div>
            </div>
            <div className="lg:hidden">
              {transactions?.map((transaction) => (
                <div
                  key={transaction.id}
                  className="mb-2 w-full p-4 border-b border-gray-100"
                >
                    <div className="flex items-center justify-between pb-2">
                  </div>
                  <div className="grid grid-cols-3 items-center  border-b pb-4">
                      <div className="m-2 items-center text-xl font-medium text-center col-span-2">
                        <p>{transaction.payer_email}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="m-2 justify-self-end text-xl font-medium text-center">
                            ${transaction.amount}
                        </p>
                      </div>
                  </div>
                  <div className="grid grid-cols-3 items-center  border-b pb-4">
                      <div className="col-span-2">
                      <p className="text-xl font-medium text-center">
                        {formatTimestamp(transaction.date.toString())}
                      </p>
                    </div>
                    <div className="col-span-1">
                          {transaction.status.toLocaleUpperCase() === 'APPROVED' ? <p className="m-2 justify-self-end text-xl font-medium text-center text-green-500">APPROVED</p> : transaction.status.toLocaleUpperCase() === 'REJECTED' ? <p className="m-2 justify-self-end text-xl font-medium text-center text-red-500">REJECTED</p> : <p className="m-2 justify-self-end text-xl font-medium text-center text-yellow-500">PENDING</p>}
                        </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="hidden lg:block mt-6 ml-4 text-xl font-bold text-left border-b pb-3">
                Latests transactions
                </p>
            <table className="hidden min-w-full text-gray-900 lg:table text-white">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-5 ">
                    Payer email
                  </th>
                  <th scope="col" className="px-3 py-5 ">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-5">
                    Date
                  </th>
                  <th scope="col" className="px-2 py-5 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {transactions?.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-6">
                      <div className="flex items-center gap-3">
                        <p>{transaction.id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-5 pr-1">
                      <div className="flex items-center gap-3">
                        <p>{transaction.payer_email}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      ${transaction.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex items-center gap-3">
                        {formatTimestamp(transaction.date.toString())}
                        </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-3">
                        <div className="flex items-center gap-3">
                           {transaction.status.toLocaleUpperCase() === 'APPROVED' ? <p className="m-2 justify-self-end text-xl font-medium text-center text-green-500">APPROVED</p> : transaction.status.toLocaleUpperCase() === 'REJECTED' ? <p className="m-2 justify-self-end text-xl font-medium text-center text-red-500">REJECTED</p> : <p className="m-2 justify-self-end text-xl font-medium text-center text-yellow-500">PENDING</p>}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
       }

      </div>
        
    );
}