'use client';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function TradeForm({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);

  return (
    <form action={dispatch} className="w-full max-w-full">
      

      <div className="-mx-3 mb-2 flex flex-wrap rounded-md bg-gray-50 p-4 md:p-6">
        {/* Trade Date */}
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Trade Date
          </label>
          <div className="relative">
            <input type='date' className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="date-error"></input>
            
          </div>
          
        </div>

        
        {/* Customer Name */}
        
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Select Client
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select Client
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Sabqa / Pending 
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pending"
                name="pending"
                type="number"
                step="0.01"
                placeholder="Client Pending Amt"
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="pending-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            
          </div>
        </div>
        <div className="mb-6 w-full px-3 py-3 md:mb-0 md:w-1/3">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Trade Type  (Sell/Buy/Sell Stock/Return/Faulty)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <select
              id="type"
              name="type"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="type-error"
            >
              <option value="" disabled>
                Select Type              </option>
                <option key='B' value='B'>Buy</option>
                <option key='S' value='B'>Sell</option>
                <option key='SS' value='B'>Stock Sell</option>
                <option key='R' value='B'>Return</option>
                <option key='F' value='B'>Faulty</option>
            
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            
            </div>
            
          </div>
        </div>
        <div className="mb-6 w-full px-3 py-3 md:mb-0 md:w-1/3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount (Pond)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter Pond Amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amt-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-6 w-full px-3 py-3 md:mb-0 md:w-1/3">
          <label htmlFor="item" className="mb-2 block text-sm font-medium">
            Select Item
          </label>
          <div className="relative">
            <select
              id="item"
              name="itemId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="item-error"
            >
              <option value="" disabled>
                Select Item
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          
        </div>
        <div className="mb-6  px-3  md:mb-0 md:w-1/3 ">
          <label htmlFor="item" className="mb-2 block text-sm font-medium">
            Select Sub Item
          </label>
          <div className="relative">
            <select
              id="subitem"
              name="subitemId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="subitem-error"
            >
              <option value="" disabled>
                Select Sub-Item
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
         
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Client Cut Rate
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cut"
                name="cut"
                type="number"
                step="0.01"
                placeholder="Client Cut Rate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                disabled
              />
              <CurrencyDollarIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            
          </div>
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Change Cut Rate
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="changeCut"
                name="changeCut"
                type="number"
                step="0.01"
                placeholder="Change Cut Rate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="changeCut-error"
              />
              <CurrencyDollarIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="changeCut-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-6 w-full px-3 py-3  md:mb-0 md:w-1/3">
          <label htmlFor="pasaAmt" className="mb-2 block text-sm font-medium">
            Pasa Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pasaAmt"
                name="pasaAmt"
                type="number"
                step="0.01"
                placeholder="Pasa Amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="pasaAmt-error"
              />
              <CurrencyDollarIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="pasaAmt-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-6 w-full px-3 py-3 md:mb-0 md:w-1/3">
          <label htmlFor="pasaWasul" className="mb-2 block text-sm font-medium">
            Pasa Wasul
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pasaWasul"
                name="pasaWasul"
                type="number"
                step="0.01"
                placeholder="Enter Pasa Amount (if any)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="pasaWasul-error"
              />
              <CurrencyDollarIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="pasaWasul-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        
      </div>
      {state.errors?.customerId &&
        state.errors.customerId.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      {state.errors?.amount &&
        state.errors.amount.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
