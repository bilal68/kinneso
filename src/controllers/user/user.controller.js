import { successResponse, errorResponse } from "../../helpers";

export const healthCheck = async (req, res) => {
  try {
    return successResponse(req, res, { message: "working" });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const generatePaySlip = async (req, res) => {
  try {
    const { firstName, lastName, annualSalary, paymentStartDate, superRate } =
      req.query;
    const grossIncome = Math.round(annualSalary / 12);
    const incomeTax = calculateIncomeTax(annualSalary);
    const netIncome = Math.round(grossIncome - incomeTax);
    const superAmount = Math.round((superRate / 100) * grossIncome);
    const obj = {
      name: `${firstName} ${lastName}`,
      "pay-period": paymentStartDate,
      "gross-income": grossIncome,
      "income-tax": incomeTax,
      "net-income": netIncome,
      "super-amount": superAmount,
    };
    return successResponse(req, res, {
      message: "User salary slip generated successfully",
      data: obj,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const calculateIncomeTax = (annualSalary) => {
  if (annualSalary > 18200 && annualSalary <= 37000) {
    const taxAbleIncome = annualSalary - 18200;
    const incomeTax = Math.round((taxAbleIncome * 0.19) / 12);
    return incomeTax;
  } else if (annualSalary > 37000 && annualSalary <= 87000) {
    const taxAbleIncome = annualSalary - 37000;
    const incomeTax = Math.round((3572 + taxAbleIncome * 0.325) / 12);
    return incomeTax;
  } else if (annualSalary > 87000 && annualSalary <= 180000) {
    const taxAbleIncome = annualSalary - 87000;
    const incomeTax = Math.round((19822 + taxAbleIncome * 0.37) / 12);
    return incomeTax;
  } else if (annualSalary > 180000) {
    const taxAbleIncome = annualSalary - 180000;
    const incomeTax = Math.round((54232 + taxAbleIncome * 0.37) / 12);
    return incomeTax;
  } else {
    return 0;
  }
};
