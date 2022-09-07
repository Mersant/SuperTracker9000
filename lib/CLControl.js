/* I find myself using ANSI escape codes a lot, so I made a little class to simplify controlling the user's terminal. */

// Command Line Control Class:
class clc {
    // Clear terminal screen
    CLS() {
        process.stdout.write('\u001bc');
    }

    // Reset text and styles to default
    RST(msg = "") {
        process.stdout.write('\u001b[0m')
        if(msg != "") {
            console.log(msg);
        }
    }

    // Not supported by all terminals, set the foreground text to a specified RGB value
    SETRGB(r,g,b) {
        process.stdout.write('\u001b' + `[38;2;${r};${g};${b}m`);
    }
    // Set foreground text to predefined colors. These functions are more widely supported than the SETRGB() function. If a message is specified, then it will log that message in the selected color then reset the text. This is useful if you just want to print a short message in a specific color without having to set and reset the text color.
    BLACK(msg = "") {
        process.stdout.write('\u001b[30m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    RED(msg = "") {
        process.stdout.write('\u001b[31m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    GREEN(msg = "") {
        process.stdout.write('\u001b[32m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    YELLOW(msg = "") {
        process.stdout.write('\u001b[33m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BLUE(msg = "") {
        process.stdout.write('\u001b[34m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    MAGENTA(msg = "") {
        process.stdout.write('\u001b[35m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    CYAN(msg = "") {
        process.stdout.write('\u001b[36m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    WHITE(msg = "") {
        process.stdout.write('\u001b[37m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }

    // Background colors
    BGBLACK(msg = "") {
        process.stdout.write('\u001b[40m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGRED(msg = "") {
        process.stdout.write('\u001b[41m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGGREEN(msg = "") {
        process.stdout.write('\u001b[42m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGYELLOW(msg = "") {
        process.stdout.write('\u001b[43m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGBLUE(msg = "") {
        process.stdout.write('\u001b[44m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGMAGENTA(msg = "") {
        process.stdout.write('\u001b[45m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGCYAN(msg = "") {
        process.stdout.write('\u001b[46m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BGWHITE(msg = "") {
        process.stdout.write('\u001b[47m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    
    BOLD(msg = "") {
        process.stdout.write('\u001b[1m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BOLDOFF() {
        process.stdout.write('\u001b[22m');
    }
    // FAINT() has spotty support compared to BOLD()
    FAINT(msg = "") {
        process.stdout.write('\u001b[2m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    FAINTOFF() {
        process.stdout.write('\u001b[22m');
    }

    UNDERLINE(msg = "") {
        process.stdout.write('\u001b[4m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    UNDERLINEOFF() {
        process.stdout.write('\u001b[24m');
    }

    BLINK(msg = "") {
        process.stdout.write('\u001b[5m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    BLINKOFF() {
        process.stdout.write('\u001b[25m');
    }

    REVERSE(msg = "") {
        process.stdout.write('\u001b[7m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    REVERSEOFF() {
        process.stdout.write('\u001b[27m');
    }

    STRIKETHROUGH(msg = "") {
        process.stdout.write('\u001b[9m');
        if(msg != "") {
            console.log(msg);
            this.RST();
        }
    }
    STRIKETHROUGHOFF() {
        process.stdout.write('\u001b[29m');
    }

    // Developer can run this function to test what functions his terminal supports
    TERMINALTEST() {
        this.RST("Default text styling. While running this test, bear in mind that some colors may appear invisible due to your terminal's theme. (i.e. black text may be invisible if your terminal background is black)");
        console.log("Foreground colors test:");
        this.BLACK("I'm black text!"); 
        this.WHITE("I'm white text!");
        this.RED("I'm red text!");
        this.GREEN("I'm green text!");
        this.YELLOW("I'm yellow text!");
        this.BLUE("I'm blue text!");
        this.MAGENTA("I'm magenta text!");
        this.CYAN("I'm cyan text!");
        this.SETRGB(60,88,112);
        console.log("I'm text with an RGB of (60,88,112), or a grayish blue!");

        this.RST("Background colors test:");
        this.BGBLACK("I have a black background!");
        this.BGWHITE("I have a white background!");
        this.BGRED("I have a red background!");
        this.BGGREEN("I have a green background!");
        this.BGYELLOW("I have a yellow background!");
        this.BGBLUE("I have a blue background!");
        this.BGMAGENTA("I have a magenta background!");
        this.CYAN("I have a cyan background!");

        this.RST("Text styling test:");
        console.log("I'm default!");
        this.BOLD("I'm bold!");
        this.FAINT("I'm faint!");
        this.UNDERLINE("I'm underlined!");
        this.BLINK("I'm blinking!");
        this.REVERSE("I'm reversed! (Swap foreground and background)")
        this.STRIKETHROUGH("I'm struck through!");
    }

}
module.exports = clc;