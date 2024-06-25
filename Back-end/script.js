const BAI1 = `moduleBAI1(Y,X);outputY;inputX;assignY=X;endmodulemoduleBAI1test(outputwire(0:0)LEDR,inputwire(0:0)SW);BAI1DUT(.Y(LEDR[0]),.X(SW[0]));endmodule`

const BAI2A = `moduleBAI2A(outputwireY,inputwireA,inputwireB);assignY=A&B;endmodulemoduleBAI2A_test(outputwire[1:0]LEDR,outputwire[0:0]LEDG,inputwire[1:0]SW);assignLEDR[1:0]=SW[1:0]BAI2ADUT(.Y(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI3A = `moduleBAI3A(outputwireSUM,outputwireCARRY,inputwireA,inputwireB);assignSUM=A^B;assignCARRY=A&B;endmodulemoduleBAI3A_test(output[1:0]LEDR,output[1:0]LEDG,input[1:0]SW);assignLEDR[1:0]=SW[1:0];BAI3ADUT(.SUM(LEDG[1]),CARRY(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI4A = `moduleBAI4A(outputregQ,outputwireQbar,inputwireD,inputwireclk,inputwirerst);assignQbar=~Q;always@(posedgeclk)beginif(~rst)Q=1'b0;elseQ=D;endendmodulemoduleBAI4A_test(output[0:0]LEDR,output[1:0]LEDG,input[0:0]SW,input[1:0]KEY);assignLEDR[0]=SW[0];BAI4ADUT(.Qbar(LEDG[0]),.D(SW[0]),.Q(LEDG[1]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI5A = `moduleBAI5A(output[3:0]Q,inputclk,inputrst);reg[3:0]value;always@(posedgeclk)beginif(~rst)value<=4'd0;elsevalue<=value+4'd1;endassignQ=value;endmodulemoduleBAI5A_test(output[3:0]LEDR,output[1:0)LEDG,input[1:0]KEY);assignLEDG[1:0]=KEY[1:0]BAI5ADUT(.Q(LEDR[3:0]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI6A = `moduleBAI6A(inputwirex,inputwirerst,inputwireclk,outputregw);parameter[2:0]A=3'b000,B=3'b001,C=3'b010,D=3'b011,E=3'b100;reg[2:0]p_state,n_state;always@(xorp_state)beginn_state=Acase(p_state)A:if(x==1'b1)n_state=B;elsenstate=A;B:if(x==1'b1)n_state=B;elsen_state=C;C:if(x==1'b1)n_state=Delsen_state=A;D:if(x==1'b1)n_state=E;elsen_state=C;E:if(x==1'b1)n_state=B;elsen_state=Cdefault:n_state=Aendcaseendalways@(xorp_state)beginw=1'b0;w=(p_state==E);endalways@(posedgeclk)beginif(~rst)p_state=Aelsep_state=n;endendmodule`

// switch
const switchInputs = document.querySelectorAll('.switch-input')

//led
const ledOutput = document.querySelectorAll('.led')

// Output of complie verilog code
var output = document.getElementById('Output');

//Code editor
const textArea = document.getElementById("code");

//Set variable for setInterval to computing I/O 
var Io_computing;


//function for line count
function updateLineCount() {

    const lineCountElement = document.getElementById("lines");

    // Get the number of lines from the textarea value
    const lines = textArea.value.split("\n").length;

    // Clear existing line number elements
    lineCountElement.innerHTML = "";

    // Create and append line number divs
    for (let i = 1; i <= lines; i++) {
        const lineNumberDiv = document.createElement("div");
        lineNumberDiv.textContent = i;
        lineCountElement.appendChild(lineNumberDiv);
    }
}
//function for run button
function executeCommands() {
    rst_All_variable()
    const regex = /module\s+(\w+)\s*\(/;
    const match = regex.exec(textArea.value);

    if (match) {
        const module_name = match[1];
        if (module_name == "BAI1" || module_name == "BAI2A"
            || module_name == "BAI3A" || module_name == "BAI4A"
            || module_name == "BAI5A" || module_name == "BAI6A") {

            complie_code(module_name);
        } else {
            output.innerHTML = "";
            output.innerHTML = `The module name: ${module_name} is not recognized`;
            return;
        }
    } else {
        output.innerHTML = "";
        output.innerHTML = "No module name is recognized";
        return;
    }
}

// function for compling verilog code
function complie_code(module_name) {

    clearInterval(Io_computing);
    let count = 0;
    const lines_with_whitespace = textArea.value.split('\n');
    const lines = textArea.value.replace(/ /g, '').split('\n');
    //BAI1

    if (module_name == "BAI1") {

        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            // Loop through each character in the line
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];

                if (char !== BAI1[count]) {

                    output.innerHTML = "";
                    output.innerHTML = `Module name: ${module_name}<br>
                        NameError: "${char}", in line ${i + 1}<br>
                        ${lines_with_whitespace[i]}`
                    return;
                }
                count++;
            }
        }
        if (count < BAI1.length) {
            output.innerHTML = "";
            output.innerHTML = `Module name: ${module_name}<br>
                        Expected  "${BAI1[count]}" at the end <br>
                        `
            return;
        }

        output.innerHTML = "";
        output.innerHTML = `Compile successfully module "${module_name}"`
        // after 0.1s call function to computing output
        Io_computing = setInterval(function () { verilog(module_name) }, 100)
    }
    //BAI2A 
    else if (module_name == "BAI2A") {
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            // Loop through each character in the line
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];

                if (char !== BAI2A[count]) {

                    output.innerHTML = "";
                    output.innerHTML = `Module name: ${module_name}<br>
                        NameError: "${char}", in line ${i + 1}<br>
                        ${lines_with_whitespace[i]}`
                    return;
                }
                count++;
            }
        }
        if (count < BAI2A.length) {
            output.innerHTML = "";
            output.innerHTML = `Module name: ${module_name}<br>
                        Expected  "${BAI2A[count]}" at the end <br>
                        `
            return;
        }
        output.innerHTML = "";
        output.innerHTML = `Compile successfully module "${module_name}"`
        // after 0.1s call function to computing output
        Io_computing = setInterval(function () { verilog(module_name) }, 100)
    }
    //BAI3A
    else if (module_name == "BAI3A") {
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            // Loop through each character in the line
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];

                if (char !== BAI3A[count]) {

                    output.innerHTML = "";
                    output.innerHTML = `Module name: ${module_name}<br>
                        NameError: "${char}", in line ${i + 1}<br>
                        ${lines_with_whitespace[i]}`
                    return;
                }
                count++;
            }
        }
        if (count < BAI3A.length) {
            output.innerHTML = "";
            output.innerHTML = `Module name: ${module_name}<br>
                        Expected  "${BAI3A[count]}" at the end <br>
                        `
            return;
        }
        output.innerHTML = "";
        output.innerHTML = `Compile successfully module "${module_name}"`
        // after 0.1s call function to computing output
        Io_computing = setInterval(function () { verilog(module_name) }, 100)
    }
    //BAI4A
    else if (module_name == "BAI4A") {
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            // Loop through each character in the line
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];

                if (char !== BAI4A[count]) {

                    output.innerHTML = "";
                    output.innerHTML = `Module name: ${module_name}<br>
                        NameError: "${char}", in line ${i + 1}<br>
                        ${lines_with_whitespace[i]}`
                    return;
                }
                count++;
            }
        }
        if (count < BAI4A.length) {
            output.innerHTML = "";
            output.innerHTML = `Module name: ${module_name}<br>
                        Expected  "${BAI4A[count]}" at the end <br>
                        `
            return;
        }
        output.innerHTML = "";
        output.innerHTML = `Compile successfully module "${module_name}"`
        // after 0.1s call function to computing output
        Io_computing = setInterval(function () { verilog(module_name) }, 100)
    }
    //BAI5A
    else if (module_name == "BAI5A") {
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            // Loop through each character in the line
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];

                if (char !== BAI5A[count]) {

                    output.innerHTML = "";
                    output.innerHTML = `Module name: ${module_name}<br>
                        NameError: "${char}", in line ${i + 1}<br>
                        ${lines_with_whitespace[i]}`
                    return;
                }
                count++;
            }
        }
        if (count < BAI5A.length) {
            output.innerHTML = "";
            output.innerHTML = `Module name: ${module_name}<br>
                        Expected  "${BAI5A[count]}" at the end <br>
                        `
            return;
        }
        output.innerHTML = "";
        output.innerHTML = `Compile successfully module "${module_name}"`
        // after 0.1s call function to computing output
        Io_computing = setInterval(function () { verilog(module_name) }, 100)
    }
    //BAI6A
    else if (module_name == "BAI6A") {
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];

            // Loop through each character in the line
            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];

                if (char !== BAI6A[count]) {

                    output.innerHTML = "";
                    output.innerHTML = `Module name: ${module_name}<br>
                        NameError: "${char}", in line ${i + 1}<br>
                        ${lines_with_whitespace[i]}`
                    return;
                }
                count++;
            }
        }
        if (count < BAI6A.length) {
            output.innerHTML = "";
            output.innerHTML = `Module name: ${module_name}<br>
                        Expected  "${BAI6A[count]}" at the end <br>
                        `
            return;
        }
        output.innerHTML = "";
        output.innerHTML = `Compile successfully module "${module_name}"`
        // after 0.1s call function to computing output
        Io_computing = setInterval(function () { verilog(module_name) }, 100)

    }
}

//select class push button
const buttons = document.querySelectorAll(".button");

// input from push button
var button_input = [0, 0, 0, 0];


// function keydown of push button
document.addEventListener("keydown", function (event) {
    if (event.key === "1") { // Keycode for number 1
        button_input[0] = 1;
        buttons[0].classList.add("active");

    }
    else if (event.key === "2") { // Keycode for number 2
        button_input[1] = 1;
        buttons[1].classList.add("active");

    } else if (event.key === "3") { // Keycode for number 3
        button_input[2] = 1;
        buttons[2].classList.add("active");
    } else if (event.key === "4") { // Keycode for number 4
        button_input[3] = 1;
        buttons[3].classList.add("active");
    }
});

// function keydown of push button
document.addEventListener("keyup", function (event) {
    if (event.key === "1") { // Keycode for number 1
        button_input[0] = 0;
        buttons[0].classList.remove("active");
    }
    else if (event.key === "2") { // Keycode for number 2
        button_input[1] = 0;
        buttons[1].classList.remove("active");
    } else if (event.key === "3") { // Keycode for number 3
        button_input[2] = 0;
        buttons[2].classList.remove("active");
    } else if (event.key === "4") { // Keycode for number 4
        button_input[3] = 0;
        buttons[3].classList.remove("active");
    }
});




//sign from switch
let switch_input = [];


//--------------------------------------------------------------------------------------------//
//global variable for BAI4A
let pre_clk_BAI4A = 0;
let Q = 0;

//count global variable for BAI5A
let value = 0;
let pre_clk_BAI5A = 0;

//2 global variables for BAI6A
let p_state = 0
let n_state = 0
let pre_clk_BAI6A = 0;
let w = 0

function rst_All_variable() {
    //global variable for BAI4A
    pre_clk_BAI4A = 0;
    Q = 0;

    //count global variable for BAI5A
    value = 0;
    pre_clk_BAI5A = 0;

    //2 global variables for BAI6A
    p_state = 0
    n_state = 0
    pre_clk_BAI6A = 0;
    w = 0
    for (let i = 0; i < switchInputs.length; i++) {
        switchInputs[i].checked = false;
    }
    for (let i = 0; i < ledOutput.length; i++) {
        ledOutput[i].classList.remove["active_led"];
    }
}
//-------------------------------------------------------------------------------------------//
//object A
var A = {
    BAI1: function (x) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        LED[0] = x
        return LED;
    },
    BAI2A: function (A, B) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        A & B ? LED[0] = 1 : LED[0] = 0;
        return LED;
    },
    BAI3A: function (A, B) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        LED[0] = A & B
        LED[1] = A ^ B
        return LED;
    },
    BAI4A: function (rst, clk, D) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        let Q_bar = 1;

        if (clk == 1 && pre_clk_BAI4A == 0) {

            if (rst == 0) {
                Q = 0
            } else {
                Q = D;
            }
        }
        pre_clk_BAI4A = clk;
        LED[0] = Q_bar;
        LED[1] = Q;
        return LED;
    },
    BAi5A: function (rst, clk) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (clk == 1 && pre_clk_BAI5A == 0) {
            if (rst == 0) {
                value = 0
            }
            else {
                (value < 15) ? value++ : value = 0
            }
        }
        pre_clk_BAI5A = clk;
        let str_binary = parseInt(value, 10).toString(2).padStart(4, "0");
        for (let i = 0; i < 4; i++) {
            LED[i] = parseInt(str_binary[i], 2);
        }
        return LED;
    },
    BAI6A: function (x, rst, clk) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0,];
        let A = 0;//[0, 0, 0];
        let B = 1;//[0, 0, 1];
        let C = 2;//[0, 1, 0];
        let D = 3;//[0, 1, 1];
        let E = 4;//[1, 0, 0];

        if (pre_clk_BAI6A === 0 && clk === 1) {
            n_state = A;
            switch (p_state) {
                case A:
                    x ? n_state = B : n_state = A;
                    break;
                case B:
                    x ? n_state = B : n_state = C;
                    break;
                case C:
                    x ? n_state = D : n_state = A;
                    break;
                case D:
                    x ? n_state = E : n_state = C;
                    break;
                case E:
                    x ? n_state = B : n_state = C;
                    break;
                default:
                    n_state = A;
                    break;
            }
            if (rst === 0) {
                p_state = A;
            } else {
                p_state = n_state;
            }
            w = 0;
            if (p_state === E) {
                w = 1
            }
        }

        pre_clk_BAI6A = clk;
        LED[0] = w;
        return LED;
    },

};


//object B
var B = {
    SW: [],
    PB: [],
    LED: [],

    passInputBtoA_and_get_output_from_A: function (a, name_module) {
        if (name_module == "BAI1" || name_module == "BAI1_test") {
            this.LED = a.BAI1(this.SW[0]).slice()
        }
        else if (name_module == "BAI2A" || name_module == "BAI2A_test") {
            this.LED = a.BAI2A(this.SW[0], this.SW[1]).slice()
        }
        else if (name_module == "BAI3A" || name_module == "BAI3A_test") {
            this.LED = a.BAI3A(this.SW[0], this.SW[1]).slice()
        }
        else if (name_module == "BAI4A" || name_module == "BAI4A_test") {
            this.LED = a.BAI4A(this.PB[0], this.PB[1], this.SW[0]).slice()

        }
        else if (name_module == "BAI5A" || name_module == "BAI5A_test") {
            this.LED = a.BAi5A(this.PB[0], this.PB[1]).slice()

        }
        else if (name_module == "BAI6A" || name_module == "BAI6A_test") {
            this.LED = a.BAI6A(this.SW[0], this.PB[0], this.PB[1]).slice()

        }
    },
    passOutputAtoC: function () {
        return this.LED;
    }
};


//object C
var C = {
    SW: [],
    PB: [],
    LED: [],

    getInputFromUser: function (switch_input, button_input) {
        this.SW = switch_input.slice();
        this.PB = button_input.slice();
    },
    passInputToB: function (b) {
        b.SW = this.SW.slice()
        b.PB = this.PB.slice()
    },
    getOutPutfromB: function (b) {

        this.LED = b.passOutputAtoC().slice()


    }
};

// create a function to get and pass input, output 
function verilog(name_module) {
    if (name_module != "") {
        // check switch on UI is checked or not

        for (let i = 0; i < switchInputs.length; i++) {
            switch_input[i] = switchInputs[i].checked ? 1 : 0;
        }
        // C get input from user
        C.getInputFromUser(switch_input, button_input);
        //C pass input for B
        C.passInputToB(B);
        //B pass input to A and get output from A
        B.passInputBtoA_and_get_output_from_A(A, name_module);
        //C get output from B
        C.getOutPutfromB(B);
        // toggle class active_led on bar led 
        for (let i = 0; i < ledOutput.length; i++) {
            ledOutput[i].classList.toggle('active_led', C.LED[i] == 1);
        }

    }

}



