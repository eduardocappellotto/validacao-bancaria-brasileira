import IBankAccount from "./Interfaces/IBankAccount";
import IBankValidator from "./Interfaces/IBankValidator";

export default abstract class CommonBankAccountValidator implements IBankValidator {
  public normalize(bankAccount: IBankAccount) {
    if (!bankAccount.bankNumber) bankAccount.bankNumber = "";
    if (!bankAccount.agencyNumber) bankAccount.agencyNumber = "";
    if (!bankAccount.agencyCheckNumber) bankAccount.agencyCheckNumber = "";
    if (!bankAccount.accountNumber) bankAccount.accountNumber = "";
    if (!bankAccount.accountCheckNumber) bankAccount.accountCheckNumber = "";

    if (bankAccount.bankNumber) bankAccount.bankNumber = parseInt(bankAccount.bankNumber).toString();
    if (bankAccount.agencyNumber) bankAccount.agencyNumber = parseInt(bankAccount.agencyNumber).toString();
    if (bankAccount.accountNumber) bankAccount.accountNumber = parseInt(bankAccount.accountNumber).toString();
    if (bankAccount.accountCheckNumber) bankAccount.accountCheckNumber = parseInt(bankAccount.accountCheckNumber).toString();

    while (bankAccount.bankNumber.length < 3) bankAccount.bankNumber = "0" + bankAccount.bankNumber;
    while (bankAccount.agencyNumber.length < this.agencyNumberLength()) bankAccount.agencyNumber = "0" + bankAccount.agencyNumber;
    while (bankAccount.accountNumber.length < this.accountNumberLength()) bankAccount.accountNumber = "0" + bankAccount.accountNumber;
    while (bankAccount.accountCheckNumber.length < 1) bankAccount.accountCheckNumber = "0" + bankAccount.accountCheckNumber;
  }

  public accountCheckNumberMatch(bankAccount: IBankAccount): boolean {
    return true;
  }

  public agencyCheckNumberMatch(bankAccount: IBankAccount): boolean {
    return true;
  }

  public agencyNumberIsValid(agencyNumber: string): boolean {
    return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
  }

  public agencyCheckNumberIsValid(agencyCheckNumber: string): boolean {
    if (!agencyCheckNumber) agencyCheckNumber = "";
    return /^[a-zA-Z0-9]{0,1}$/.test(agencyCheckNumber);
  }

  public accountNumberIsValid(accountNumber: string): boolean {
    return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
  }

  public accountCheckNumberIsValid(accountCheckNumber: string): boolean {
    if (!accountCheckNumber) accountCheckNumber = "";
    return /^[a-zA-Z0-9]{1}$/.test(accountCheckNumber);
  }

  public agencyNumberMsgError(): string {
    return "A ag??ncia deve conter " + this.agencyNumberLength() + " n??meros. Complete com zeros a esquerda se necess??rio.";
  }

  public agencyCheckNumberMsgError(): string {
    const length = this.agencyCheckNumberLength();

    if (!length) {
      return "N??o insira d??gito da ag??ncia";
    } else if (length === 1) {
      return "O d??gito da ag??ncia deve conter 1 d??gito";
    } else {
      return "O d??gito da ag??ncia deve conter " + length + " n??meros. Complete com zeros a esquerda se necess??rio.";
    }
  }

  public accountNumberMsgError(): string {
    return "A conta corrente deve conter " + this.accountNumberLength() + " n??meros. Complete com zeros a esquerda se necess??rio.";
  }

  public agencyNumberLength() {
    return 4;
  }

  public agencyCheckNumberLength() {
    return 0;
  }

  public accountNumberLength() {
    return 0;
  }
}
