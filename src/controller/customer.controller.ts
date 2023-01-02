import customerProfileService from "../services/customerRepository/customer.profile.service";
import customerUpdateServices from "../services/customerRepository/customer.update.service";
import customerCreateService from "../services/customerRepository/customer.create.service";
import customerDeleteService from "../services/customerRepository/customer.delete.service";
import customerLoginService from "../services/customerRepository/customer.login.service";
import customerListService from "../services/customerRepository/customer.list.service";
import { ICustomerLogin } from "../interfaces/customer.interface";
import { ICustomer } from "../interfaces/customer.interface";
import { Request, Response } from "express";

class CustomerController {
  static async create(req: Request, res: Response) {
    const { name, last_name, email, password, admin }: ICustomer = req.body;
    const customer = await customerCreateService({
      name,
      last_name,
      email,
      password,
      admin,
    });

    return res
      .status(201)
      .json({ message: "Customer created successfully", data: customer });
  }

  static async login(req: Request, res: Response) {
    const { email, password }: ICustomerLogin = req.body;
    const token = await customerLoginService({ email, password });

    return res.json({ message: "Login successful", token: token });
  }

  static async list(_: Request, res: Response) {
    const customers = await customerListService();
    return res.json(customers);
  }

  static async profile(req: Request, res: Response) {
    const { customer_id } = req.params;
    const customer = await customerProfileService({ customer_id });

    return res.json(customer);
  }

  static async update(req: Request, res: Response) {
    const { customer_id } = req.params;
    const { name, last_name, email, password, admin }: ICustomer = req.body;
    const customer = await customerUpdateServices({
      name,
      last_name,
      email,
      password,
      admin,
      customer_id,
    });

    return res.json({
      message: "Customer updated successfully",
      data: customer,
    });
  }

  static async delete(req: Request, res: Response) {
    const { customer_id } = req.params;
    await customerDeleteService({ customer_id });

    return res.json({ message: "Customer deleted successfully" });
  }
}

export default CustomerController;
