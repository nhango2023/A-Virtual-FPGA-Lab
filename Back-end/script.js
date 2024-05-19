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

// related to uploading file
const fileInput = document.getElementById('file-upload');
const uploadBtn = document.getElementById('upload-btn');
const fileLabel = document.getElementById('file-label');

//tile of file uploaded and initial empty string
var name_module = "";

//event click on label with class file upload
uploadBtn.addEventListener('click', function () {
    fileInput.click();
});

// event change on label with class file upload
fileInput.addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result; //get all contents in file uploaded

        // Regular expression to match a word after whitespace and before "("
        const regex = /module\s+(\w+)\s*\(/;

        // Match the string and capture the word in a group
        const match = regex.exec(content);

        if (match) {
            // Extracted word is in the first capturing group (index 1)
            const extractedWord = match[1];
            //assign name of module
            name_module = extractedWord;
            rst_All_variable();
            console.log("Extracted characters:", extractedWord); // Output: "name of module"
        } else {
            name_module = "-------";
        }
    };
    reader.readAsText(event.target.files[0]);

    // Update label text with filename
    const fileName = event.target.files[0].name;
    fileLabel.textContent = `Selected file: ${fileName}`;
});

// switch
const switchInputs = document.querySelectorAll('.switch-input')

//led
const ledOutput = document.querySelectorAll('.led')

//sign from switch
var switch_input = [];
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
    //rst = PB[0]
    //clk = PB[1]
    //w = sw[0]

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
var count = 1;
// create a function to get and pass input, output 
function verilog() {


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
        // console.log("rst---", "clk-----", "value");
        console.log(C.SW[0] + "-----" + C.PB[0] + "----" + C.PB[1] + "-----" + p_state + "------" + n_state + "-------" + C.LED[0]);

    }

}
// initial function to get and pass input, output 


// after 0.5s call function verilog
setInterval(verilog, 100)