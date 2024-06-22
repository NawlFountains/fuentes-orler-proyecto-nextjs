import { Transaction } from "@/app/lib/definitions";
import { formatTimestamp } from "@/app/lib/utils";

export default async function LatestsTransactions({transactions} : {transactions: Transaction[]}) {
    return (
        <div className="mt-6 flow-root text-white">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg p-2 md:pt-0 border border-gray-200 bg-gray-800 shadow-sm">
            <div className="md:hidden border-b pb-3 bg-gray-800">
                <p className="text-xl font-bold text-center">
                Latests transactions
                </p>
            </div>
            <div className="md:hidden">
              {transactions?.map((transaction) => (
                <div
                  key={transaction.id}
                  className="mb-2 w-full p-4 border-b border-gray-100"
                >
                    <div className="flex items-center justify-between pb-2">
                  </div>
                  <div className="grid grid-cols-3 items-center  border-b pb-4">
                      <div className="m-2 items-center text-xl font-medium text-center">
                        <p>{transaction.product_name}</p>
                      </div>
                      <div>
                        <p className="m-2 justify-self-end text-xl font-medium text-center">
                            ${transaction.amount}
                        </p>
                      </div>
                      <div>
                        <p className="m-2 justify-self-end text-xl font-medium text-center">
                            {transaction.status.toLocaleUpperCase()}
                        </p>
                      </div>
                  </div>
                  <div className="flex w-full pt-4">
                    <div className="w-full">
                      <p className="text-xl font-medium text-center">
                        {formatTimestamp(transaction.date.toString())}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table text-white">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-5 ">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-5 ">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-5">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
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
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{transaction.id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{transaction.product_name}</p>
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
                    <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex items-center gap-3">
                            {transaction.status.toLocaleUpperCase()}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        
    );
}