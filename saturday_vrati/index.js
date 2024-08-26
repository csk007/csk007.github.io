/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

var options = {weekday: 'long',year: 'numeric', month: 'short', day: 'numeric' };
var options2 = {weekday: 'long', month: 'long', day: 'numeric' };

var saturdays = [];


var todayStr = new Date().toLocaleDateString("en-IN", options2);

var today = new Date();



// testing for all today scenarios 
//today.setDate(today.getDate() + 120);

var nextMonth = new Date(today.getFullYear() + 1, 0, 1);

if (today.getMonth() === 11) {
    nextMonth = new Date(today.getFullYear() + 1, 0, 1);
} else {
    nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
}


console.log('today',today)
saturdays = getSaturdaysOfMonth(today);

console.log('saturdays this month: ',saturdays);
console.log('2nd Saturday this month: ',saturdays[1])

if (today <= saturdays[1]) {
    console.log('===VRATI is in this month');
    console.log('===VRATI date this month: ',saturdays[1]);
} else {
    console.log('===VRATI is in next month');
    saturdays = getSaturdaysOfMonth(nextMonth);
    console.log('saturdays next month: ',saturdays);
    console.log('2nd Saturday next month: ',saturdays[1])
    console.log('===VRATI date next month: ',saturdays[1]);
}

var daysLeft = datediff(today,saturdays[1]);

console.log('daysLeft: ', daysLeft);

var finalStr ='';

if (daysLeft === 0){
  finalStr = 'Today is the second saturday of the month, which is your Vrati Day.';
} else if (daysLeft === 1){
    finalStr = 'Tomorrow is the second saturday of the month, which is your Vrati Day.';
} else if (daysLeft === 2){
    finalStr = 'Day After Tomorrow is the second saturday of the month, which is your Vrati Day.';
} else {
    finalStr = 'Your Next Vrati is on '+ saturdays[1].toLocaleDateString("en-IN", options2) +' it is the second saturday of the month, which is in '+daysLeft+' Days.';
}

const repromptStr = ' You can say list 1, list 2, list 3  or full list , to know all the items to take along. or just say bye to cancel.';
finalStr = finalStr + repromptStr;

console.log('finalStr:',finalStr);

function getSaturdaysOfMonth(date) {
    var saturdaysTemp = [];
    var d = new Date(date);
    var month = d.getMonth();
    console.log('getSaturdaysOfMonth: next sat month 0-11: ',month);
    d.setDate(1);
    console.log('getSaturdaysOfMonth d: ',d);
    console.log('getSaturdaysOfMonth month: ',month);
    // Get the first Saturday in the month
    while (d.getDay() !== 6) {
        d.setDate(d.getDate() + 1);
    }
    console.log('getSaturdaysOfMonth 1st sat of month: ',d);
    // Get all the other Saturdays in the month
    while (d.getMonth() === month) {
        var sat = new Date(d.getTime());
        saturdaysTemp.push(sat);
        d.setDate(d.getDate() + 7);
    }
  return saturdaysTemp;
}

function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = finalStr;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptStr)
            .getResponse();
    }
};

const list1 = 'Prathna Preeti, Trikal Sandhya Cards, Read Vangmai, Car Service Check, Car ReFuel, Car Tyres Air Check, Mobile Battery Charge, Small Book, Pen, lots of Positivity And Smile,';
const list2 = 'Umbrella, Thermal Wear, Night Wear, Earmuffs, Kerchief, Mattress, Tarpaulin, Blanket, Pillow, Odomos, ToothBrush Kit, Towel, Innerwear, Bucket, Mug, Soap, Hair Cream, Comb, Extra Clothes,';
const list3 = 'Lunch Bag, Plate, Spoons, Tissue paper, Newspaper, Extra Polythene Covers, Water Bottle, Common Medicines, optional first aid kit';
const full_list = list1 + ' ' + list2 + ' ' + list3;

const FullListIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FullListIntent';
    },
    handle(handlerInput) {
        const speakOutput = full_list;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptStr)
            .getResponse();
    }
};


const ListOneIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListOneIntent';
    },
    handle(handlerInput) {
        const speakOutput = list1;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptStr)
            .getResponse();
    }
};


const ListTwoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListTwoIntent';
    },
    handle(handlerInput) {
        const speakOutput = list2;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptStr)
            .getResponse();
    }
};

const ListThreeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListThreeIntent';
    },
    handle(handlerInput) {
        const speakOutput = list3;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptStr)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = finalStr;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye CSK, Have a wonderful vrati saturday!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};




/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FullListIntentHandler,
        ListOneIntentHandler,
        ListTwoIntentHandler,
        ListThreeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();