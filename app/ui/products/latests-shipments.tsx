import { ShippingDetails } from "@/app/lib/definitions";

export default async function LatestsShipments({shipments} : {shipments: ShippingDetails[]}) {
    return (
      <div className="mt-6 mb-6 flow-root text-white">
       {shipments.length == 0 ? <div></div> :
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg p-2 md:pt-0 border border-gray-200 bg-gray-800 shadow-sm">
            <div className="lg:hidden border-b pb-3 bg-gray-800">
              <div>
                <p className="text-xl font-bold text-center">
                Latests Shipments
                </p>
              </div>
            </div>
            <div className="lg:hidden">
              {shipments?.map((shipment) => (
                <div
                  key={shipment.id}
                  className="mb-2 w-full p-4 border-b border-gray-100"
                >
                    <div className="flex items-center justify-between pb-2">
                  </div>
                  <div className="grid grid-cols-3 items-center  border-b pb-4">
                      <div className="m-2 items-center text-xl font-medium text-center">
                        <p>{shipment.payment_id}</p>
                      </div>
                      <div>
                        <p className="m-2 justify-self-end text-xl font-medium text-center">
                            {shipment.street_name} {shipment.street_number}
                        </p>
                      </div>
                      <div>
                        {shipment.status == "delivered" ? (
                          <p className="m-2 justify-self-end text-xl font-medium text-center text-green-500">
                            DELIVERED
                          </p>
                        ) : (
                          <p className="m-2 justify-self-end text-xl font-medium text-center text-yellow-500">
                            PENDING
                          </p>
                        )}
                      </div>
                  </div>
                    <p className="text-xl font-medium text-center mt-2">
                          {shipment.id}
                      </p>
                </div>
              ))}
            </div>
            <p className="hidden lg:block mt-6 ml-4 text-xl font-bold text-left border-b pb-3">
                Latests shipments
                </p>
            <table className="hidden min-w-full text-gray-900 lg:table text-white">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-5 ">
                    Payment ID
                  </th>
                  <th scope="col" className="px-3 py-5 ">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {shipments?.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{shipment.id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{shipment.payment_id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex items-center gap-3">
                        {shipment.street_name}, {shipment.street_number}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex items-center gap-3">
                        {shipment.status == "delivered" ? (
                          <p className="m-2 justify-self-end text-xl font-medium text-center text-green-500">
                            DELIVERED
                          </p>
                        ) : (
                          <p className="m-2 justify-self-end text-xl font-medium text-center text-yellow-500">
                            PENDING
                          </p>
                        )}
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