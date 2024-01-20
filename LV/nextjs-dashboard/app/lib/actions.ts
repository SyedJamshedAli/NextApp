'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function deleteInvoice(id:string)
{
  throw new Error('Failed to Delete Invoice');

try{  
  console.log(`Deleing Invoice : ${id}`)
 await sql`    delete from invoices    WHERE id = ${id}  `;
  revalidatePath('/dashboard/invoices');
}
catch(err){
  return {message:'DB Err: Failed to delete invoice..'}
}
}

export async function updateInvoice(id:string,formData:FormData)
{
  console.log(id)  
  const rawFormData = Object.fromEntries(formData.entries());
  const { customerId, amount, status } = UpdateInvoice.parse(rawFormData);
  const amtInCents=amount*100;
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amtInCents}, status = ${status}
    WHERE id = ${id}
  `;
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const rawFormData_ = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };
  const rawFormData = Object.fromEntries(formData.entries());
  const { customerId, amount, status } = CreateInvoice.parse(rawFormData);

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try{  await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  }
  catch(err)
  {
    return {
      message:'Database Err: Failed to create invoice.'
    }
  }
  //    console.log(rawFormData);
  //   console.log(rawFormData_);
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');


}
