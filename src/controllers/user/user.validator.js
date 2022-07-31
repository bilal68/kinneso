const Joi = require("joi");
const moment = require("moment");
export const generatePaySlip = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  annualSalary: Joi.number().required(),
  superRate: Joi.number().required(),
  paymentStartDate: Joi.required().custom((value, helper) => {
    const span = value.split("-");
    const startDate = moment(span[0].trim(), "DD MMMM");
    const endDate = moment(span[1].trim(), "DD MMMM");
    const s = startDate.format("DD-MMMM");
    const e = endDate.format("DD-MMMM");
    const startDateMonth = startDate.startOf("month").format("DD-MMMM");
    const endDateMonth = endDate.endOf("month").format("DD-MMMM");
    if (!startDate.isValid() || !endDate.isValid()) {
      return helper.message("Either start or end of the month is in correct!");
    } else if (
      !moment(s).isSame(startDateMonth) ||
      !moment(e).isSame(endDateMonth)
    ) {
      return helper.message("The entered date span is not of one month!");
    } else if (!startDate.isSame(endDate, "month")) {
      return helper.message(
        "Date should be of same month span!"
      );
    } else {
      return true;
    }
  }),
});
