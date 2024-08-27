import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber: string = '0';
  firstOperand: number = 0;
  operator: string = '';

  tempHistory: string = '';

  waitForSecondNumber: boolean = false;
  isNegativ:boolean = false;
  sqRootFlag: boolean = true;


  constructor() {}

  ngOnInit(): void {
  }


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event.key)

    if(Number(event.key)){
      this.getNumber(event.key);
    }
    else if(event.key === 'Escape'){
      this.clear();
    }
    else{
      this.getOperation(event.key);
    }
  }
    

  public getNumber(v: string){
    //console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }
    else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
    }

    if(this.isNegativ){
      this.currentNumber = '-' + this.currentNumber;
      
    }
    else{
      this.currentNumber = this.currentNumber.replace('-','');
    }
  }


  public getOperation(op: string){
    console.log(op);

    this.isNegativ = false;

    if(this.firstOperand === 0){ //null
      this.firstOperand = Number(this.currentNumber);

    }
    else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = Number(result);
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
    this.showHistory()
  }
  
  public setNegativ(){
    this.isNegativ = !this.isNegativ;
    console.log(this.isNegativ);
  }

  rotation = 0;
  flipIt(){
    this.rotation += 180;    
    document.getElementById("flip-it")!.style.transform = `rotate(${this.rotation}deg)`;
    //document.getElementById("flip-it")!.style.transform = `scale(5  , 5)`;    
  }


  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }


  private doCalculation(op: string , secondOp: number){
    switch (op){
      case '+':
        //this.tempHistory += ' + ';
        return this.firstOperand += secondOp; 
      
      case '-':
        //this.tempHistory += ' - ';
        return this.firstOperand -= secondOp; 
      
      case '*':
        //this.tempHistory += ' * ';
        return this.firstOperand *= secondOp; 
      
      case '/':
        //this.tempHistory += ' : ';
        return this.firstOperand /= secondOp; 
      
      case '=':
        //this.tempHistory += ' = ';
        return secondOp;
      
      case 'sqrt':
        //this.tempHistory += ' &radic; ';
        return ""+  this.sqRoot();

      default: return "error"
    }
  }

  public sqRoot(){
    let retnumber = Math.sqrt(Number(this.currentNumber));
    this.clear();
    this.currentNumber = String(retnumber);
  }


  public clear(){
    this.currentNumber = '0';
    this.firstOperand = 0;
    this.operator = '';
    this.waitForSecondNumber = false;
    this.isNegativ = false;
  }

  showHistory(){
    //console.log("showHistory()", this.currentNumber)
    // document.getElementById('story')!.innerText = this.tempHistory;
    
  
  }
    
}
