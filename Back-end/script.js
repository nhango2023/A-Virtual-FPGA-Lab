const BAI1 = `moduleBAI1(Y,X);outputY;inputX;assignY=X;endmodulemoduleBAI1test(outputwire(0:0)LEDR,inputwire(0:0)SW);BAI1DUT(.Y(LEDR[0]),.X(SW[0]));endmodule`

const BAI2A = `moduleBAI2A(outputwireY,inputwireA,inputwireB);assignY=A&B;endmodulemoduleBAI2A_test(outputwire[1:0]LEDR,outputwire[0:0]LEDG,inputwire[1:0]SW);assignLEDR[1:0]=SW[1:0]BAI2ADUT(.Y(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI3A = `moduleBAI3A(outputwireSUM,outputwireCARRY,inputwireA,inputwireB);assignSUM=A^B;assignCARRY=A&B;endmodulemoduleBAI3A_test(output[1:0]LEDR,output[1:0]LEDG,input[1:0]SW);assignLEDR[1:0]=SW[1:0];BAI3ADUT(.SUM(LEDG[1]),CARRY(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI4A = `moduleBAI4A(outputregQ,outputwireQbar,inputwireD,inputwireclk,inputwirerst);assignQbar=~Q;always@(posedgeclk)beginif(~rst)Q=1'b0;elseQ=D;endendmodulemoduleBAI4A_test(output[0:0]LEDR,output[1:0]LEDG,input[0:0]SW,input[1:0]KEY);assignLEDR[0]=SW[0];BAI4ADUT(.Qbar(LEDG[0]),.D(SW[0]),.Q(LEDG[1]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI5A = `moduleBAI5A(output[3:0]Q,inputclk,inputrst);reg[3:0]value;always@(posedgeclk)beginif(~rst)value<=4'd0;elsevalue<=value+4'd1;endassignQ=value;endmodulemoduleBAI5A_test(output[3:0]LEDR,output[1:0)LEDG,input[1:0]KEY);assignLEDG[1:0]=KEY[1:0]BAI5ADUT(.Q(LEDR[3:0]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI6A = `moduleBAI6A(inputwirex,inputwirerst,inputwireclk,outputregw);parameter[2:0]A=3'b000,B=3'b001,C=3'b010,D=3'b011,E=3'b100;reg[2:0]p_state,n_state;always@(xorp_state)beginn_state=Acase(p_state)A:if(x==1'b1)n_state=B;elsenstate=A;B:if(x==1'b1)n_state=B;elsen_state=C;C:if(x==1'b1)n_state=Delsen_state=A;D:if(x==1'b1)n_state=E;elsen_state=C;E:if(x==1'b1)n_state=B;elsen_state=Cdefault:n_state=Aendcaseendalways@(xorp_state)beginw=1'b0;w=(p_state==E);endalways@(posedgeclk)beginif(~rst)p_state=Aelsep_state=n;endendmodule`

// switch on UI
const switch_UI = document.querySelectorAll('.switch-input');

//led on UI
const led_green_UI = document.querySelectorAll(`.led-green`);

//led on UI
const led_red_UI = document.querySelectorAll('.led-red');

// Output of complie verilog code
const output = document.getElementById('Output');

//Code editor
const textArea = document.getElementById("code");

//Set variable for setInterval to computing I/O 
var Io_computing;

//save text from textarea

document.getElementById('saveButton').addEventListener('click', function () {
    // Get the text from the textarea
    let textToSave = document.getElementById('code').value;

    // Create a Blob with the text
    let textBlob = new Blob([textToSave], { type: 'text/plain' });

    // Create a link element
    let downloadLink = document.createElement('a');

    // Create a URL for the Blob and set it as the href attribute of the link
    downloadLink.href = URL.createObjectURL(textBlob);

    // Set the download attribute with a filename
    downloadLink.download = 'verilog.txt';

    // Append the link to the body (necessary for Firefox)
    document.body.appendChild(downloadLink);

    // Programmatically click the link to trigger the download
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
});

//open a file 
document.getElementById('openButton').addEventListener('click', function () {
    // Programmatically click the hidden file input element
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    // Get the selected file
    let file = event.target.files[0];

    // Create a FileReader to read the file
    let reader = new FileReader();

    // Define the onload event handler
    reader.onload = function (e) {
        // Get the file content
        let fileContent = e.target.result;

        // Display the file content in the textarea
        document.getElementById('code').value = fileContent;
    };

    // Read the file as text
    reader.readAsText(file);
});

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

//push button on UI
const buttons = document.querySelectorAll(".button");

// push button
let push_button = [0, 0, 0, 0];

// function keydown of push button
document.addEventListener("keydown", function (event) {
    if (event.key === "0") { // Keycode for number 1
        push_button[3] = 1;
        buttons[3].classList.add("active");
        if (name_module === "BAI5B" || name_module === "BAI5C" || name_module === "BAI6C") {
            led_green_UI[7].classList.add("active_ledgreen")
        }

    }
    else if (event.key === "1") { // Keycode for number 2
        push_button[2] = 1;
        buttons[2].classList.add("active");
        if (name_module === "BAI5B" || name_module === "BAI5C") {
            led_green_UI[6].classList.add("active_ledgreen")
        }

    } else if (event.key === "2") { // Keycode for number 3
        push_button[1] = 1;
        buttons[1].classList.add("active");
    } else if (event.key === "3") { // Keycode for number 4
        push_button[0] = 1;
        buttons[0].classList.add("active");
    }
});

// function keydown of push button
document.addEventListener("keyup", function (event) {
    if (event.key === "0") { // Keycode for number 1
        push_button[3] = 0;
        buttons[3].classList.remove("active");
        if (name_module === "BAI5B" || name_module === "BAI5C" || name_module === "BAI6C") {
            led_green_UI[7].classList.remove("active_ledgreen")
        }
    }
    else if (event.key === "1") { // Keycode for number 2
        push_button[2] = 0;
        buttons[2].classList.remove("active");
        if (name_module === "BAI5B" || name_module === "BAI5C") {
            led_green_UI[6].classList.remove("active_ledgreen")
        }
    } else if (event.key === "2") { // Keycode for number 3
        push_button[1] = 0;
        buttons[1].classList.remove("active");
    } else if (event.key === "3") { // Keycode for number 4
        push_button[0] = 0;
        buttons[0].classList.remove("active");
    }
});


//initial switch and green led
let dip_switch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let ledGreen = [0, 0, 0, 0, 0, 0, 0, 0];
let ledRed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//--------------------------------------------------------------------------------------------//
//global variable for BAI4A
let pre_clk_BAI4A = 0;
let Q_BAI4A = 0;

//count global variable for BAI5A
let value_BAI5A = 0;
let pre_clk_BAI5A = 0;

// global variables for BAI6A
let p_state_BAI6A = 0
let n_state_BAI6A = 0
let pre_clk_BAI6A = 0;
let w_BAI6A = 0

//global variables for BAI3C
let X_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];
let En_BAI3C = 0;

//global variables for BAI4B
let pre_clk_BAI4B = 0;

//global variables for BAI4C
let pre_clk_BAI4C = 0;
let S_reg_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
let S_reg_pre_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
let S_next_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
let ctrl_BAI4C = [0, 0];

//global variables for BAI5B
let pre_clk_BAI5B = 0;
let value_BAI5B = 0;

//global variables for BAI5B
let pre_clk_BAI5C = 0;
let value_BAI5C = [0, 0, 0, 0];

// global variables for BAI6A
let p_state_BAI6B = 0
let n_state_BAI6B = 0
let pre_clk_BAI6B = 0;
let w_BAI6B = 0
let x_pre_BAI6B = 0
let p_state_pre_BAI6B = 0;

// global fucntion for BAI6C
let light_BAI6C = [1, 0, 0, 0, 0, 1];
let flag_BAI6C = 2;
let delay_BAI6C = () => {
    light_BAI6C = [1, 0, 0, 0, 0, 1]
    let s0, s1, s2, s3, s4, s5;
    clearTimeout(s0);
    clearTimeout(s1);
    clearTimeout(s2);
    clearTimeout(s3);
    clearTimeout(s4);
    clearTimeout(s5);
    s0 = setTimeout(() => {
        console.log("s1");
        light_BAI6C = [0, 1, 0, 0, 0, 1];
    }, 15000);
    s1 = setTimeout(() => {
        console.log("s2");
        light_BAI6C = [0, 0, 1, 0, 0, 1];
    }, 18000)
    s2 = setTimeout(() => {
        console.log("s3");
        light_BAI6C = [0, 0, 1, 1, 0, 0];
    }, 21000)
    s3 = setTimeout(() => {
        console.log("s4");
        light_BAI6C = [0, 0, 1, 0, 1, 0];
    }, 36000)
    s4 = setTimeout(() => {
        console.log("s5");
        light_BAI6C = [0, 0, 1, 0, 0, 1];
    }, 39000)
    s5 = setTimeout(() => {
        console.log("s0");
        light_BAI6C = [1, 0, 0, 0, 0, 1];
        flag_BAI6C = 0
    }, 42000)

}

//-----------------------------------------------------------------

function rst_All_variable() {
    //global variable for BAI4A
    pre_clk_BAI4A = 0;
    Q_BAI4A = 0;

    //count global variable for BAI5A
    value_BAI5A = 0;
    pre_clk_BAI5A = 0;

    //2 global variables for BAI6A
    p_state_BAI6A = 0
    n_state_BAI6A = 0
    pre_clk_BAI6A = 0;
    w_BAI6A = 0
    for (let i = 0; i < switch_UI.length; i++) {
        switch_UI[i].checked = false;
    }
    for (let i = 0; i < 18; i++) {
        led_green_UI[i].classList.remove["active_ledred"];
    }
    for (let i = 18; i < 26; i++) {
        led_green_UI[i].classList.remove["active_ledgreen"];
    }
}
//-------------------------------------------------------------------------------------------//
//object A
const A = {
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
                Q_BAI4A = 0
            } else {
                Q_BAI4A = D;
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
                value_BAI5A = 0
            }
            else {
                (value_BAI5A < 15) ? value_BAI5A++ : value_BAI5A = 0
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
            n_state_BAI6A = A;
            switch (p_state_BAI6A) {
                case A:
                    x ? n_state_BAI6A = B : n_state_BAI6A = A;
                    break;
                case B:
                    x ? n_state_BAI6A = B : n_state_BAI6A = C;
                    break;
                case C:
                    x ? n_state_BAI6A = D : n_state_BAI6A = A;
                    break;
                case D:
                    x ? n_state_BAI6A = E : n_state_BAI6A = C;
                    break;
                case E:
                    x ? n_state_BAI6A = B : n_state_BAI6A = C;
                    break;
                default:
                    n_state_BAI6A = A;
                    break;
            }
            if (rst === 0) {
                p_state_BAI6A = A;
            } else {
                p_state_BAI6A = n_state;
            }
            w_BAI6A = 0;
            if (p_state_BAI6A === E) {
                w_BAI6A = 1
            }
        }

        pre_clk_BAI6A = clk;
        LED[0] = w;
        return LED;
    },
    BAI2B: function (A, B) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        A | B ? LED[7] = 1 : LED[7] = 0;
        return LED;
    },
    BAI2C: function (A, B, C, D) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        LED[7] = ((A ^ B) ^ (C ^ D));
        return LED;
    },
    BAI3B: function (A, B, C) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        let SUM1 = A ^ B
        let CARRY1 = A & B
        let CARRY2 = SUM1 & C
        let CARRY = CARRY1 | CARRY2
        let SUM = SUM1 ^ C

        LED[7] = SUM;
        LED[6] = CARRY;
        return LED;
    },
    BAI3C: function (X, En, LED) {
        if (JSON.stringify(X) !== JSON.stringify(X_BAI3C)
            || En !== En_BAI3C) {

            if (En) {
                console.log(X[7]);
                if (X[7] === 1) {
                    LED = [0, 0, 0, 0, 0, 1, 1, 1];
                }
                else if (X[6] === 1) {
                    LED = [0, 0, 0, 0, 0, 1, 1, 0];
                }
                else if (X[5] === 1) {
                    LED = [0, 0, 0, 0, 0, 1, 0, 1];
                }
                else if (X[4] === 1) {
                    LED = [0, 0, 0, 0, 0, 1, 0, 0];
                }
                else if (X[3] === 1) {
                    LED = [0, 0, 0, 0, 0, 0, 1, 1];
                }
                else if (X[2] === 1) {
                    LED = [0, 0, 0, 0, 0, 0, 1, 0];
                }
                else if (X[1] === 1) {
                    LED = [0, 0, 0, 0, 0, 0, 0, 1];
                }
                else if (X[0] === 1) {
                    LED = [0, 0, 0, 0, 0, 0, 0, 0];
                }
                //b'zzz
                else {
                    LED = [0, 0, 0, 0, 0, 0, 0, 0];
                }
            }
        }
        X_BAI3C = X;
        En_BAI3C = En;
        console.log("led: ", LED)
        return LED;
    },
    BAI4B: function (D, clk, rst, Q) {
        if (clk !== pre_clk_BAI4B && clk === 1) {
            if (rst === 0) {
                Q = [0, 0, 0, 0, 0, 0, 0, 0];
            }
            else {
                let Q1 = [0, 0, 0, 0];
                let Q2 = Q.slice(5, 8);
                Q2.push(D);
                Q1.push(...Q2);
                Q = Q1;
            }
        }
        pre_clk_BAI4B = clk;
        return Q;
    },
    BAI4C: function (clk, rst, ctrl, D) {
        if (pre_clk_BAI4C !== clk && clk === 1) {
            if (rst === 0) {
                S_reg_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
            }
            else {
                console.log("S_reg_BAI4C = S_next_BAI4C;");
                S_reg_pre_BAI4C = S_reg_BAI4C;
                S_reg_BAI4C = S_next_BAI4C;
            }
        }

        if (JSON.stringify(ctrl) !== JSON.stringify(ctrl_BAI4C) ||
            JSON.stringify(S_reg_BAI4C) !== JSON.stringify(S_reg_pre_BAI4C)) {
            let ctrl_temp = ctrl.join("");
            if (ctrl_temp === "00") {
                S_next_BAI4C = S_reg_BAI4C;
            }
            else if (ctrl_temp === "01") {
                let temp = S_reg_BAI4C.slice(0, 7);
                temp.unshift(D[0]);
                S_next_BAI4C = temp.slice();
            }

            else if (ctrl_temp === "10") {
                let temp = S_reg_BAI4C.slice(1, 8);
                temp.push(D[7]);
                S_next_BAI4C = temp;
            }
            else {
                S_next_BAI4C = D;
            }
        }
        ctrl_BAI4C = ctrl;
        pre_clk_BAI4C = clk;
        S_reg_pre_BAI4C = S_reg_BAI4C;
        let Q = S_reg_BAI4C;
        return Q;
    },
    BAI5B: function (clk, rst, up_down) {
        let LED = [0, 0, 0, 0];
        if (clk == 1 && pre_clk_BAI5B == 0) {
            if (rst == 0) {
                value_BAI5B = 0
            }
            else if (up_down === 0) {
                (value_BAI5B < 15) ? value_BAI5B++ : value_BAI5B = 0
            }
            else {
                (value_BAI5B > 0) ? value_BAI5B-- : value_BAI5B = 0
            }
        }
        pre_clk_BAI5B = clk;
        let str_binary = parseInt(value_BAI5B, 10).toString(2).padStart(4, "0");
        for (let i = 0; i < 4; i++) {
            LED[i] = parseInt(str_binary[i], 2);
        }
        return LED;
    },
    BAI5C: function (clk, rst) {
        if (clk === 1 && pre_clk_BAI5C === 0) {
            if (rst === 0) {
                value_BAI5C = [0, 0, 0, 1];
            }
            else {
                let temp = value_BAI5C[0];
                value_BAI5C = value_BAI5C.slice(1);
                value_BAI5C.push(temp);
            }
        }
        pre_clk_BAI5C = clk;

        return value_BAI5C;
    },
    BAI6B: function (clk, rst, x) {
        if (pre_clk_BAI6B === 0 && clk === 1) {
            n_state_BAI6B = 0;
            switch (p_state_BAI6B) {
                case 0:
                    x ? n_state_BAI6B = 1 : n_state_BAI6B = 0;
                    break;
                case 1:
                    x ? n_state_BAI6B = 1 : n_state_BAI6B = 2;
                    break;
                case 2:
                    x ? n_state_BAI6B = 3 : n_state_BAI6B = 0;
                    break;
                case 3:
                    x ? n_state_BAI6B = 1 : n_state_BAI6B = 2;
                    break;
                default:
                    n_state_BAI6B = 0;
                    break;
            }
            if (rst === 0) {
                p_state_BAI6B = 0;
            } else {
                p_state_pre_BAI6B = p_state_BAI6B;
                p_state_BAI6B = n_state_BAI6B;
            }
        }
        if (p_state_pre_BAI6B !== p_state_BAI6B || x_pre_BAI6B !== x) {
            w_BAI6B = 0;
            if (p_state_BAI6B === 3 && x === 1) {
                w_BAI6B = 1;
            }
        }
        x_pre_BAI6B = x;
        pre_clk_BAI6B = clk;
        console.log(p_state_BAI6B);
        return w_BAI6B;
    },
    BAI6C: function (rst) {
        if (rst === 0) {
            flag_BAI6C = 0;
            light_BAI6C = [1, 0, 0, 0, 0, 1];
        }
        if ((flag_BAI6C === 0 || flag_BAI6C === 2) && rst === 1) {
            flag_BAI6C = 1;
            delay_BAI6C();

        }
        return light_BAI6C;
    },

};
//object B
const B = {
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
        else if (name_module == "BAI2B" || name_module == "BAI2B_test") {
            this.LED = a.BAI2B(this.SW[17], this.SW[16]).slice();
        }
        else if (name_module == "BAI2C" || name_module == "BAI2C_test") {
            this.LED = a.BAI2C(this.SW[17], this.SW[16], this.SW[15], this.SW[14]).slice();
        }
        else if (name_module == "BAI3B" || name_module == "BAI3B_test") {
            this.LED = a.BAI3B(this.SW[17 - 2], this.SW[17 - 1], this.SW[17 - 0]).slice();
        }
        else if (name_module == "BAI3C" || name_module == "BAI3C_test") {
            let x_temp = this.SW.slice(10, 18).reverse()
            console.log(x_temp[7])
            this.LED = a.BAI3C(x_temp, this.SW[9], this.LED.slice()).slice();
        }
        else if (name_module == "BAI4B" || name_module == "BAI4B_test") {
            this.LED = a.BAI4B(this.SW[17], this.PB[2], this.PB[3], this.LED).slice();
        }
        else if (name_module == "BAI4C" || name_module == "BAI4C_test") {
            let ctrl = this.SW.slice(8, 10);
            let D = this.SW.slice(10, 18);
            this.LED = a.BAI4C(this.PB[2], this.PB[3], ctrl, D).slice();
        }
        else if (name_module == "BAI5B" || name_module == "BAI5B_test") {
            let temp = a.BAI5B(this.PB[2], this.PB[3], this.SW[17]).slice();
            console.log(temp)
            this.LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.LED.push(...temp);
        }
        else if (name_module == "BAI5C" || name_module == "BAI5C_test") {
            let temp = a.BAI5C(this.PB[2], this.PB[3]).slice();
            this.LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.LED.push(...temp);
        }
        else if (name_module == "BAI6B" || name_module == "BAI6B_test") {
            let temp = a.BAI6B(this.PB[2], this.PB[3], this.SW[17]);
            this.LED = [0, 0, 0, 0, 0, 0, 0];
            this.LED.push(temp);
        }
        else if (name_module == "BAI6C" || name_module == "BAI6C_test") {
            console.log("pb0: ", this.PB[3])
            let temp = a.BAI6C(this.PB[3]);
            this.LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.LED.push(...temp);
        }
    },
    passOutputAtoC: function () {
        return this.LED;
    }
};


//object C
const C = {
    SW: [],
    PB: [],
    LED: [],

    getInputFromUser: function (dip_switch, push_button) {
        this.SW = dip_switch.slice();
        this.PB = push_button.slice();
    },
    passInputToB: function (b) {
        b.SW = this.SW.slice();
        b.PB = this.PB.slice();
        b.LED = this.LED.slice();
    },
    getOutPutfromB: function (b) {

        this.LED = b.passOutputAtoC().slice();

    }
};

// create a function to get and pass input, output 
function verilog(name_module) {
    if (name_module != "") {
        // check switch on UI is checked or not
        for (let i = 0; i < switch_UI.length; i++) {
            if (switch_UI[i].checked) {
                dip_switch[i] = 1;
                if (name_module === "BAI6B") {
                }
                else if (name_module !== "BAI5B" && name_module !== "BAI5C" && name_module !== "BAI6C") {
                    led_red_UI[i].classList.add('active_ledred');
                }
                else {
                    if (switch_UI[17].checked) {
                        led_green_UI[5].classList.add("active_ledgreen");
                    }
                    else {
                        led_green_UI[5].classList.remove("active_ledgreen");
                    }
                }

            } else {
                dip_switch[i] = 0;
                led_red_UI[i].classList.remove('active_ledred');
            }
        }
        // C get input from user
        C.getInputFromUser(dip_switch, push_button);
        //C pass input for B
        C.passInputToB(B);
        //B pass input to A and get output from A
        B.passInputBtoA_and_get_output_from_A(A, name_module);
        //C get output from B
        C.getOutPutfromB(B);

        // toggle class active_led on green led
        if (name_module !== "BAI5B" && name_module !== "BAI5C" && name_module !== "BAI6C") {
            for (let i = 0; i < ledGreen.length; i++) {
                led_green_UI[i].classList.toggle('active_ledgreen', C.LED[i] === 1);
            }
        }
        else {
            for (let i = 0; i < ledRed.length; i++) {
                led_red_UI[i].classList.toggle('active_ledred', C.LED[i] === 1);
            }
        }
    }
}

setInterval(() => {
    name_module = "BAI6C";
    verilog("BAI6C");
}, 10);






