import { row } from "./index.js";
export let contactUs = document.getElementById("contactUs");

contactUs.addEventListener("click", () => {
    row.innerHTML = `
     <div class="col-md-6 w-100">
        <div class="contactUsInput w-100 mt-5 p-2">
            <div class="nameAndEmail d-flex justify-content-center align-items-center gap-3">
                <input type="text" name="userName" class="w-50 my-1 rounded-2 ps-2 p-1" id="contactInputName" placeholder="Enter your name...">
                <input type="email" name="userEmail" class="w-50 my-1 rounded-2 ps-2 p-1" id="contactInputEmail" placeholder="Enter your email...">
            </div>
            <div class="nameAndEmail d-flex justify-content-center align-items-center gap-3">
                <input type="text" name="userNumber" class="w-50 my-1 rounded-2 ps-2 p-1" id="contactInputNumber" placeholder="Enter your phone number...">
                <input type="number" name="userAge" class="w-50 my-1 rounded-2 ps-2 p-1" id="contactInputAge" placeholder="Enter your age...">
            </div>
            <div class="nameAndEmail d-flex justify-content-center align-items-center gap-3">
                <input type="password" name="userPassword" class="w-50 my-1 rounded-2 ps-2 p-1" id="contactPassword" placeholder="Enter your password">
                <input type="password" name="repassword" class="w-50 my-1 rounded-2 ps-2 p-1" id="contactRepass" placeholder="Re-enter your password">
            </div>
            <div class="submit py-3 d-flex justify-content-center align-items-center">
                <button class="btn btn-outline-danger disabled" id="down">Submit</button>
            </div>
        </div>
    </div>
    `;

    let contactInputName = document.getElementById("contactInputName");
    let contactInputEmail = document.getElementById("contactInputEmail");
    let contactInputNumber = document.getElementById("contactInputNumber");
    let contactPassword = document.getElementById("contactPassword");
    let contactRepass = document.getElementById("contactRepass");
    let down = document.getElementById("down");

    const inputElements = [contactInputName, contactInputEmail, contactInputNumber, contactPassword, contactRepass];

    inputElements.forEach(input => {
        input.addEventListener("input", () => {
            // let input = input.value;
            new Validation(input.value);
            validateAllFields();
        });
    });

    function validateAllFields() {
        let allValid = inputElements.every(input => {
            if (input.id === 'contactRepass') {
                return regex[input.id]().test(input.value);
            } else {
                return regex[input.id].test(input.value);
            }
        });

        if (allValid) {
            down.classList.remove("disabled");
            down.classList.add("enable");
        } else {
            down.classList.remove("enable");
            down.classList.add("disabled");
        }
    }
});

export const regex = {
    contactInputName: /^[a-zA-Z\s'-]+$/,
    contactInputEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactInputNumber: /^[1-9]\d{1,11}$/,
    contactPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    contactRepass: function() {
        let passwordValue = document.getElementById("contactPassword").value;
        return new RegExp(`^${passwordValue}$`);
    }
};

export class Validation {
    constructor(element) {
        this.Valid(element);
    }
    Valid(element) {
        let valid;
        if (element.id === 'contactRepass') {
            valid = regex[element.id]().test(element.value);
        } else {
            valid = regex[element.id].test(element.value);
        }

        if (valid) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
        } else {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
        }
    }
}


