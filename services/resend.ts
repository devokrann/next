import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_KEY);

export default resend;
