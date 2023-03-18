class BrainfuckInterpreter {
    constructor() {
        this.memory = new Array(30000).fill(0);  // Initialize the memory array
        this.pointer = 0;  // Initialize the pointer to point to the first cell
        this.output = '';  // Initialize the output string
    }
    interpret(code) {
        let i = 0;
        let amount = 0;
        while (i < code.length) {
            amount++;
            if (amount > 100000) {
                return "Error: Infinite loop detected";
                break;
            }
            switch (code[i]) {
                case '>':
                    this.pointer++;
                    break;
                case '<':
                    this.pointer--;
                    break;
                case '+':
                    this.memory[this.pointer]++;
                    if (this.memory[this.pointer] > 255) {
                        this.memory[this.pointer] = 0;
                    }
                    break;
                case '-':
                    this.memory[this.pointer]--;
                    if (this.memory[this.pointer] < 0) {
                        this.memory[this.pointer] = 255;
                    }
                    break;
                case '.':
                    this.output += String.fromCharCode(this.memory[this.pointer]);
                    break;
                case ',':
                    this.memory[this.pointer] = prompt('Enter a character: ').charCodeAt(0);
                    break;
                case '#':
                    alert("Pointer Position: " + this.pointer + "\nValue at current cell: "+this.memory[this.pointer]);
                    break;
                case '[':
                    if (this.memory[this.pointer] === 0) {
                        let loopDepth = 1;
                        while (loopDepth > 0) {
                            i++;
                            if (code[i] === '[') {
                                loopDepth++;
                            } else if (code[i] === ']') {
                                loopDepth--;
                            }
                        }
                    }
                    break;
                case ']':
                    if (this.memory[this.pointer] !== 0) {
                        let loopDepth = 1;
                        while (loopDepth > 0) {
                            i--;
                            if (code[i] === ']') {
                                loopDepth++;
                            } else if (code[i] === '[') {
                                loopDepth--;
                            }
                        }
                    }
                    break;
                default:
                    // Ignore any characters that aren't valid Brainfuck commands
                    break;
            }
            i++;
        }
        return this.output;
    }
    reset() {
        this.memory = new Array(30000).fill(0);
        this.pointer = 0;
        this.output = '';
    }
}

Blockly.Blocks['increment_pointer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(">")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(190);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['decrement_pointer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("<")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(190);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['increment_value'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("+")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(190);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['decrement_value'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("-")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(190);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['output'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(".")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(190);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['input'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(",")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(190);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['loop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("[");
        this.appendStatementInput("LOOP_CONTENT")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("]");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(220);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['start'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Start");
        this.setColour(349);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
        this.setMovable(false);
        this.setDeletable(false);
        this.setEditable(false);
    }
};

Blockly.Blocks['comment'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Comment"), "COMMENT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['debug'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Debug");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Main",
            "contents": [
                {
                    "kind": "block",
                    "type": "increment_pointer"
                },
                {
                    "kind": "block",
                    "type": "decrement_pointer"
                },
                {
                    "kind": "block",
                    "type": "increment_value"
                },
                {
                    "kind": "block",
                    "type": "decrement_value"
                },
                {
                    "kind": "block",
                    "type": "output"
                },
                {
                    "kind": "block",
                    "type": "input"
                },
                {
                    "kind": "block",
                    "type": "loop"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Extra",
            "contents": [
                {
                    "kind": "block",
                    "type": "comment"
                },
                {
                    "kind": "block",
                    "type": "debug"
                },
            ]
        }
    ]
}

const bfGenerator = new Blockly.Generator('brainfuck');
bfGenerator['increment_pointer'] = function(block) {
    return '>';
}
bfGenerator['decrement_pointer'] = function(block) {
    return '<';
}
bfGenerator['increment_value'] = function(block) {
    return '+';
}
bfGenerator['decrement_value'] = function(block) {
    return '-';
}
bfGenerator['output'] = function(block) {
    return '.';
}
bfGenerator['input'] = function(block) {
    return ',';
}
bfGenerator['loop'] = function(block) {
    let loopContent = bfGenerator.statementToCode(block, 'LOOP_CONTENT');
    // remove whitespace
    loopContent = loopContent.replace(/\s/g, '');
    return '[' + loopContent + ']';
}
bfGenerator['start'] = function(block) {
    return '';
}
bfGenerator['comment'] = function(block) {
    return '';
}
bfGenerator['debug'] = function(block) {
    return '#';
}

bfGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + bfGenerator.blockToCode(nextBlock);
    }
    return code;
};

const interpreter = new BrainfuckInterpreter();

function runCode() {
    // reset memory
    interpreter.reset();
    const code = bfGenerator.workspaceToCode(workspace);
    document.getElementById('output').innerHTML = interpreter.interpret(code);
}

function exportCode() {
    // save workspace to file
    const link = document.createElement('a');
    const file = new Blob([Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))], {type: 'text/xml'});
    link.href = URL.createObjectURL(file);
    link.download = 'code.xml';
    link.click();
    URL.revokeObjectURL(link.href);
}

function importCode() {
    // open file selection dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            // clear workspace
            workspace.clear();
            // load code from file
            const xml = event.target.result;
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
        };
        reader.readAsText(file);
    };
    input.click();
}

function exportBfCode() {
    const link = document.createElement('a');
    let code = bfGenerator.workspaceToCode(workspace);
    // remove debug statements
    code = code.replace(/#/g, '');
    console.log(code);
    const file = new Blob([code], {type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = 'code.bf';
    link.click();
    URL.revokeObjectURL(link.href);
}

const theme = Blockly.Theme.defineTheme('bfTheme', {
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'workspaceBackgroundColour': '#1D263B',
        'toolboxBackgroundColour': '#23395B',
        'toolboxForegroundColour': '#FFFBFF',
        'flyoutBackgroundColour': '#23395B',
        'flyoutForegroundColour': '#FFFBFF',
        'flyoutOpacity': 1,
        'scrollbarColour': '#c0bec0',
    },
    'fontStyle': {
        'family': 'monospace',
    }
});

Blockly.HSV_SATURATION = 0.93;
Blockly.HSV_VALUE = 0.82;

var workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    trashcan: false,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.1,
        scaleSpeed: 1.2
    },
    move: {
        scrollbars: true,
        drag: true,
        wheel: true
    },
    theme: theme
});

// Place start block in workspace
var startBlock = workspace.newBlock('start');
startBlock.initSvg();
startBlock.render();
startBlock.moveBy(50, 50);

// Disable blocks not connected to start block
workspace.addChangeListener(Blockly.Events.disableOrphans);
