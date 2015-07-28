
$(document).bind("contextmenu", function(e) {
                 preventDefault(e);
                 });
function avoidKeyPressing(event) {
    if (event.ctrlKey) {
        alert('Open in new Tab is disabled.');
        if (event.preventDefault)
            event.preventDefault();
        return false;
    } else if (event.shiftKey) {
        alert('Open in new Window is disabled.');
        if (event.preventDefault)
            event.preventDefault();
        return false;
    } else if (typeof(event.altKey) == 'undefined' ? event.originalEvent.altKey : event.altKey) {
        alert('Saving this link is disabled.');
        if (event.preventDefault)
            event.preventDefault();
        return false;
    }
    return true;
}

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function theMouseWheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', theMouseWheel, false);
    }
    window.onmousewheel = document.onmousewheel = theMouseWheel;
}

$(document).keydown(function(e) {
                    // var code = (e.keyCode ? e.keyCode : e.which);
                    // if(code == 8 || code == 116){
                    // return false;
                    // }
                    });

/** *************Disable right click*********************** */
function clickIE() {
    if (document.all) {
        return false;
    }
}

function clickNS(e) {
    if (document.layers || (document.getElementById&&!document.all)) {
        if (e.which == 2 || e.which == 3) {
            return false;
        }
    }
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
} else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}




/** ****************common functions **************************** */

function readXML(filePath, func) {
    var xml;
    $.ajax({
           type: "POST",
           url: "/" + filePath,
           async: false,
           dataType: ($.browser.msie) ? "text" : "xml",
           success: function(data) {

           if (typeof data == "string") {
           xml = new ActiveXObject("Microsoft.XMLDOM");
           xml.async = false;
           xml.loadXML(data);
           } else {
           xml = data;
           }
           eval(func);
           },
           error: function () {
           //alert(filePath)
           window.location.href = "error1.html?E404"+filepath;
           }
           });
}

function checkVersion() {
    /*if($.browser.msie){
     if($.browser.version<7){
     window.location.href="error.html?E505";
     }
    	}else if($.browser.mozilla){
     if($.browser.version<4){
     window.location.href="error.html?E505";
     }
    	}else if($.browser.webkit) {
     if($.browser.version<15){
     window.location.href="error.html?E505";
     }
    	}else if($.browser.safari) {
     if($.browser.version<5.1){
     window.location.href="error.html?E505";
     }
    	}*/
}

function readAndReturnXML(filePath) {
    var xml = "";
    //window.location.href = "error20.html?E404" + filePath;
    $.ajax({
           type: "POST",
           url: "/" + filePath,
           async : false,
           dataType: ($.browser.msie) ? "text" : "xml",
           success: function(data) {
           if (typeof data == "string") {
           xml = new ActiveXObject("Microsoft.XMLDOM");
           xml.async = false;
           xml.loadXML(data);
           } else {
           xml = data;
           }

           },
           error : function() {
           //alert(filePath)
           setTimeout(function(){window.location.href = "error21.html?E404"+filePath;}, 50)
           //window.location.href="error.html?E404";
           }
           });
    return xml;
}

function alignHeight() {
    var height = $(window).height() - ($("#header").height() + $("#footer").height());
    $('#mainleft').css({
                       "height": height
                       });
    $('#mainright').css({
                        "height": height
                        });
}

function quizPageHeight() {
    var height = $(window).height() - ($("#header").height() + $("#footer").height());
    $('#mainleft').css({
                       "height": height
                       });
    $('#mainright').css({
                        "height": height
                        });
    if (iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues].quesType == "TYPING") {
        $('#questionCont').height($('#mainleft').height() - $('#groups').outerHeight(true) - 2);
        $('#currentQues').height($('#questionCont').height() - 2);
    } else {
        $('#questionCont').height($('#mainleft').height() - ($('#groups').outerHeight(true) + $('#sectionsField').outerHeight(true)) - 2);
        $('#currentQues').css({
                              height: $('#questionCont').height() - $('#actionButton').outerHeight(true) - 2,
                              overflow: 'auto'
                              });
    }
    if ($('#groups').height() != 0) {
        $('#timer').height($('#groups').height() + $('#sectionsField').height());
    }
    $('.numberpanel').height($('#mainright').height() - $('#timer').height());
    $('#numberpanelQues').height($('.numberpanel').height() - ($('#viewSection').height() + $('#quesPallet').height() + $('#legend').height() + 30));
    $('#sectionSummaryDiv').height($('#questionCont').height());
    $('#QPDiv').height($('#questionCont').height());
    $('#profileDiv').height($('#questionCont').height());
    $('#instructionsDiv').height($('#questionCont').height());
    $('#typingInstDiv').height($('.numberpanel').height() - ($('#viewSection').height() + $('#typingSubmit').height() + 30));
    $('#breakTimeDiv').height(height);
    $('#scoreCardDiv').height(height);
    $('#quesOuterDiv').css({
                           height: ($('#currentQues').height() - $('.questionTypeCont').outerHeight(true) - 2),
                           overflow: 'auto'
                           });
    $('#quesAnsContent').css({
                             height: ($('#quesOuterDiv').height() - $('#quesNumberDiv').outerHeight(true) - $("#progStatusDisplay").outerHeight(true) - 2),
                             overflow: 'auto'
                             });
    $('#progEditorDisplay').height($('#progRightPart').height() - $('#progDescriptionDiv').outerHeight(true) - 2);
}

function parseSysInstructions(page, sysInstrXML, useSystemInstructions, orgId, mockId, isOptionalSectionsAvailable, isMarkedForReviewConsidered, compMockDuration) {
    var o, instructionContent;
    var xml = readAndReturnXML(orgId + '/' + mockId + '/custInstructions.xml');
    $('#defaultLang').val($(xml).find('LANGID').text());
    o = new Option("-- Select --", "0");
    $(o).html("-- Select --");
    $("#defaultLanguage").append(o);

    $(xml).find("INSTRUCTION").each(function() {
                                    var langName = $(this).find("LANGNAME").text();
                                    var langId = $(this).find("LANGID").text();
                                    o = new Option(langName, "cusInstText" + langId);
                                    $(o).html(langName);
                                    $("#cusInst").append(o);

                                    o = new Option(langName, "sysInstText" + langId);
                                    $(o).html(langName);
                                    $("#basInst").append(o);

                                    o = new Option(langName, langId);
                                    $(o).html(langName);
                                    $("#defaultLanguage").append(o);


                                    if ($.trim($(this).find("INSTRUCTIONTEXT").text()) == "" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == null || $.trim($(this).find("INSTRUCTIONTEXT").text()) == " ")
                                    instructionContent = "The instructions are not available in the chosen language. ";
                                    else {
                                    instructionContent = $.trim($(this).find("INSTRUCTIONTEXT").text());
                                    }
                                    if (page == 'inst') {
                                    $('#secondPagep1').append("<div id='cusInstText" + langId + "' style='display:none;height:91%;width:99.5%;overflow:auto'>" + instructionContent + "</div>");
                                    $('#firstPage').append("<div id='sysInstText" + langId + "' style='display:none;height:93%;width:99.5%;overflow:auto'>The instructions are not available in the chosen language.</div>");
                                    } else {
                                    $('#secondPagep1').append("<div id='cusInstText" + langId + "' style='display:none;'>" + instructionContent + "</div>");
                                    $('#firstPage').append("<div id='sysInstText" + langId + "' style='display:none;'>The instructions are not available in the chosen language.</div>");
                                    }

                                    $(sysInstrXML).find("INSTRUCTION").each(function() {
                                                                            if (langName.toUpperCase() == $(this).find("LANGNAME").text().toUpperCase()) {
                                                                            if ($.trim($(this).find("INSTRUCTIONTEXT").text()) == "" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == null ||
                                                                                $.trim($(this).find("INSTRUCTIONTEXT").text()) == " " || $.trim($(this).find("INSTRUCTIONTEXT").text()) == "<br>" || $.trim($(this).find("INSTRUCTIONTEXT").text()) == "<br/>") {
                                                                            instructionContent = "The instructions are not available in the chosen language. ";
                                                                            } else {
                                                                            instructionContent = $.trim($(this).find("INSTRUCTIONTEXT").text());
                                                                            }
                                                                            $("#sysInstText" + langId).html(instructionContent);
                                                                            if (useSystemInstructions == "YES") {
                                                                            if (langName.toUpperCase() == "ENGLISH") {
                                                                            if (isMarkedForReviewConsidered == "NO") {
                                                                            $(".considerMarkedReview").html("NOT");
                                                                            } else if (isMarkedForReviewConsidered == "YES") {
                                                                            $(".considerMarkedReview2").html("or marked for review");
                                                                            }

                                                                            if (isOptionalSectionsAvailable == "YES") {
                                                                            $("#sysInstText" + langId).append($(sysInstrXML).find("OPTIONALTEXTENGLISH").text());
                                                                            }
                                                                            } else if (langName.toUpperCase() == "HINDI") {
                                                                            if (isMarkedForReviewConsidered == "NO") {
                                                                            $(".considerMarkedReviewHindi").html("&#2344;&#2361;&#2368;&#2306;");
                                                                            } else if (isMarkedForReviewConsidered == "YES") {
                                                                            $(".considerMarkedReviewHindi2").html("&#2351;&#2366; &#2346;&#2369;&#2344;&#2352;&#2381;&#2357;&#2367;&#2330;&#2366;&#2352; &#2325;&#2375; &#2354;&#2367;&#2319; &#2330;&#2367;&#2344;&#2381;&#2361;&#2367;&#2340; &#2361;&#2376;");
                                                                            }

                                                                            if (isOptionalSectionsAvailable == "YES") {
                                                                            $("#sysInstText" + langId).append($(sysInstrXML).find("OPTIONALTEXTHINDI").text());
                                                                            }
                                                                            }
                                                                            }
                                                                            }
                                                                            });
                                    });
    $(".completeDuration").html(compMockDuration);
    calcTotalQues(orgId, mockId);
}

function changeSysInst(param, value) {
    $('*[id^="' + value + '"]').hide();
    $('#' + param).show();
}


function validateExpiry(orgId, mockId) {
    var xml = readAndReturnXML(orgId + '/' + mockId + '/confDetails.xml');
    var curDate = new Date();
    if ($.trim($(xml).find("STARTDATE").text()) != null && $.trim($(xml).find("STARTDATE").text()) != "") {
        var startDate = new Date(parseInt($.trim($(xml).find("STARTDATE").text())));
        if (curDate <= startDate) {
            window.location.href = "error3.html?E110";
        }
    }
    if ($.trim($(xml).find("ENDDATE").text()) != null && $.trim($(xml).find("ENDDATE").text()) != "") {
        var startDate = new Date(parseInt($.trim($(xml).find("ENDDATE").text())));
        if (curDate >= startDate) {
            window.location.href = "error4.html?E105";
        }
    }
}

/** ****************index page **************************** */
function validateIndexPageURL() {
    var url = document.URL;
    var params = url.split("index.html?");
    var orgId = $.trim(params[1]).split("@@")[0];
    var mockId = $.trim(params[1]).split("@@")[1];
    if (params.length > 1 ) {
        if (mockId.indexOf("#")>-1) {
            mockId = mockId.substring(0, mockId.indexOf("#"));
        }
        if ($.trim(params[1]).length > 0) {
            validateExpiry(orgId, mockId);
            var xml = readAndReturnXML(orgId + '/' + mockId + '/confDetails.xml');
            basicDetails(xml);
            $("#pWait").hide();
        }
    } else {
        window.location.href = "error5.html";
    }

}

function basicDetails(xml) {
    mockVar.candResponseUrl = $(xml).find("CandidateResponseHandlerURL").text();
    mockVar.mockName = $(xml).find("MOCKNAME").text();
    $("#mockName").html(mockVar.mockName);
    if ($(xml).find("USELOGINID").text().toLowerCase() == "no") {
        mockVar.loginLabel = $(xml).find("LOGINID").text();
    } else {
        mockVar.loginLabel = "Username";
    }
    $("#loginName").prepend(mockVar.loginLabel);
    if ($(xml).find("USEDEFAULTCANDIDATEIMG").length > 0 && $(xml).find("USEDEFAULTCANDIDATEIMG").text() == "NO") {
        $("#candidateImg").attr("src", $(xml).find("CANDIDATEIMGPATH").text());
    } else {
        $("#candidateImg").attr("src", "/static/quiz/images/NewCandidateImage.jpg");
    }
    if ($(xml).find("USEBANNER").text().toLowerCase() == "yes") {
        $("#bannerImage").html("<img height= '45px' src='" + $(xml).find("BANNERPATH").text() + "'/>");
    } else {
        $("#bannerImage").html('<div style="margin-top:10px"><font size=4 color="#ffffff"><b>' + $(xml).find("BANNERTEXT").text() + '</b></font></div>');
        $("#bannerImage").attr("align", "center");
    }
    if ($(xml).find('SHOWVIEWQPBUTTON').length > 0 && $(xml).find('SHOWVIEWQPBUTTON').text() == 'NO') {
        $('#viewQPTD').hide();
        $('#submitTD').removeAttr('width');
        $('#submitTD').attr('colSpan', '2');
    } else {
        $('#viewQPTD').show();
        $('#submitTD').removeAttr('colspan');
    }
    if ($(xml).find('USEHORIZONTALOPTION').length > 0 && $(xml).find('USEHORIZONTALOPTION').text() == 'YES') {
        mockVar.showOptionsHorizontally = 1;
    }
    if ($(xml).find('SHOWCALCULATOR').length > 0 && $(xml).find('SHOWCALCULATOR').text() == 'YES') {
        mockVar.showCalculator = 1;
        $('#showCalc').show();
    }
    if ($(xml).find('SHOWSCORECARD').length > 0 && $(xml).find('SHOWSCORECARD').text() == 'YES') {
        mockVar.displayScoreCard = 1;
    }
    if ($(xml).find('SHOWPERCENTAGESCORE').length > 0 && $(xml).find('SHOWPERCENTAGESCORE').text() == 'YES') {
        mockVar.displayPercentageScore = 1;
    }
    if ($(xml).find('STORECANDRESPONSE').length > 0 && $(xml).find('STORECANDRESPONSE').text() == 'YES') {
        mockVar.storeCandResponse = 1;
    }
    $("#footer").html("<div style='width:100%;padding-top:15px;'><center><font color='white'> Version : " + $(xml).find("VERSION").text() + "</font></center></div>");
    if ($(xml).find('SoftwareLangNames').length > 0 && $.trim($(xml).find('SoftwareLangNames').text()).length > 0) {
        for (var i = 0; i < $(xml).find('SoftwareLangNames').text().split(',').length; i++) {
            var value = $(xml).find('SoftwareLangNames').text().split(',')[i];
            $('#languageSelect').append($('<option>').text(value).attr('value', value));
        }
        if ($(xml).find('SoftwareLangNames').text().split(',').length > 1)
            $('#multilingualDropdown').show();
    }
}


/** ****************instrutions page************************************* */

function setInstruHeights() {
    alignHeight();
    var height = $('#mainleft').actual('height') - ($('#instPagination'). actual('height'));
    $('#firstPage').css({
                        "height": height - 10
                        });
    height = $('#mainleft').actual('height') - ($('#secondPagep2').actual('height') + $('#instPagination'). actual('height'));
    $('#secondPagep1').css({
                           "height": height - 10
                           });
}

function validateInstPageUrl() {
    var url = document.URL;
    var params = url.split("instructions.html?");
    var orgId = $.trim(params[1]).split("@@")[0];
    var mockId = $.trim(params[1]).split("@@")[1];
    if (mockId != null && mockId.length > 0) {
        if (mockId.indexOf("#")>-1) {
            mockId = mockId.substring(0, mockId.indexOf("#"));
        }
        if (params.length > 1 && $.trim(params[1]).length > 0) {
            validateExpiry(orgId, mockId);
            //window.location.href = orgId + mockId;
            readXML(orgId + '/' + mockId + '/confDetails.xml', 'readSysInstructionsXMLInstPage(xml,"' + orgId + '","' + mockId + '")');
            loadInstruLabels();
        } else {
            window.location.href = "error6.html";
        }
    } else {
        window.location.href = "OOO"+mockId+"error7.html";
    }
}


function readSysInstructionsXMLInstPage(xml, orgId, mockId) {
    var langId = 1;
    if ($(xml).find("USEDEFAULTCANDIDATEIMG").length > 0 && $(xml).find("USEDEFAULTCANDIDATEIMG").text() == "NO") {
        $("#candidateImg").attr("src", $(xml).find("CANDIDATEIMGPATH").text());
    } else {
        $("#candidateImg").attr("src", "/static/quiz/images/NewCandidateImage.jpg");
    }
    var useSystemInstructions = $(xml).find("USESYSTEMINSTRUCTIONS").text();
    var compMockTime = $(xml).find("COMPLETEMOCKDURATION").text();
    var isOptionalSectionsAvailable = $(xml).find("ISOPTIONALSECTIONSAVAILABLE").text();
    var isMarkedForReviewConsidered = $(xml).find("ISMARKEDFORREVIEWCONSIDERED").text();
    if ($(xml).find("USEBANNER").text().toLowerCase() == "yes") {
        $("#bannerImage").html("<img height= '45px' src='" + $(xml).find("BANNERPATH").text() + "'/>");
    } else {
        $("#bannerImage").html('<div style="margin-top:10px"><font size=4 color="#ffffff"><b>' + $(xml).find("BANNERTEXT").text() + '</b></font></div>');
        $("#bannerImage").attr("align", "center");
    }
    $("#footer").html("<div style='width:100%;padding-top:15px;'><center><font color='white'> Version : " + $(xml).find("VERSION").text() + "</font></center></div>");
    if (useSystemInstructions.toUpperCase() == "NO") {
        var xml = readAndReturnXML(orgId + '/sysInstructions.xml');
        parseSysInstructions('inst', xml, useSystemInstructions.toUpperCase(), orgId, mockId, isOptionalSectionsAvailable.toUpperCase(), isMarkedForReviewConsidered.toUpperCase(), compMockTime);
    } else {
        var xml = readAndReturnXML(orgId + '/' + 'sysInstructions.xml');
        parseSysInstructions('inst', xml, useSystemInstructions.toUpperCase(), orgId, mockId, isOptionalSectionsAvailable.toUpperCase(), isMarkedForReviewConsidered.toUpperCase(), compMockTime);
    }

    if (document.getElementById("basInst").options.length > 1) {
        $('#basInst').parent().show();
        $('#cusInst').parent().show();
        $('#defaultLangOptions').show();
    }

    if ($('#basInst option:selected').val().indexOf('sysInstText')>-1)
        langId = $('#basInst option:selected').val().split('sysInstText')[1];
    $('#sysInstText' + langId).show();
    $('#cusInstText' + langId).show();
    $('#pWait').hide();

}




/** ***************quiz page******************************* */

var iOAP = {}; // contains details of the current group

function setGroupObj(groupObj) {
    this.groupObj = groupObj;
}

/*
 * var groupObj = { sections : new Array(), secDetails : new Array(), languages :
 * new Array(), viewLang : new Array(), modules :
 * ["instructionsDiv","profileDiv","QPDiv","questionCont","sectionSummaryDiv"],
 * showMarks : false, showQType : true, curSection : 1, curQues : 1,
 * defaultLang: "", secWiseTimer: 0, noOptSec : 0, maxNoOptSec : '', time: '' ,
 * minSubmitTime : '' }; // Contains the details of a Group
 */
function createNewGroupObj() {
    this.sections = new Array();
    this.secDetails = new Array();
    this.languages = new Array();
    this.viewLang = new Array();
    this.modules = ["instructionsDiv", "profileDiv", "QPDiv", "questionCont", "sectionSummaryDiv"];
    this.showMarks = false;
    this.showQType = true;
    this.curSection = 1;
    this.curQues = 1;
    this.defaultLang = "";
    this.secWiseTimer = 0;
    this.noOptSec = 0;
    this.maxNoOptSec = 0;
    this.minTime = 0;
    this.maxTime = 0;
    this.breakTime = 0;
    this.isEditable = "N";
    this.isViewable = "N";
    this.firstNonTimeBoundGrp = false;
    this.isDisabled = true;
    this.isTypingGroup = false;
    this.hasOfflineSect = false;
    return this;
}

var mockLabels = {
    correctAnswerMarks : '',
    negativeMarks : '',
    viewIn : '',
    questionNo : '',
    questionType : '',
    usefulData : '',
    timeLeft : '',
    savenext : '',
    markAsAnswered : '',
    yes : '',
    no : '',
    back : '',
    reset : '',
    resetSect : '',
    submitExam : '',
    submitGrp : ''
};

var mockVar = {
    submitted : false;
    candResponseUrl : '',
    mockName : '',
    loginLabel : '',
    orgId : 0,
    mockId : 0,
    candId : '',
    // default candidate ID
    mcQName : '',
    // mcq questions name
    msQName : '',
    // msq questions name
    saQName : '',
    // SA questions name
    compQName : '',
    // comp questions name
    laQName : '',
    // LA questions name
subjQName: '',
    // subjective questions name
typingQName: '',
    // typing question name
programingQName: '',
    // typing question name
    modules : ["instructionsDiv", "profileDiv", "QPDiv", "questionCont", "sectionSummaryDiv"],
    // Modules are various div in the question area
    groups : new Array(),
    typingGroup : new Array(),
    currentGrp : 1,
    isMarkedForReviewConsidered : '',
time: 0 ,
    timeLeft : 0,
isHelpContentAvailable: false,
    helpContent : new Array(),
    minSubmitTime : 0,
    activeLinkList : ['viewQPButton', 'viewInstructionsButton', 'viewProButton', 'finalSub', 'finalTypingSub'],
    totalQues : 0,
    showOptionsHorizontally : 0,
    showCalculator : 0,
    displayScoreCard : 0,
    displayPercentageScore : 0,
    storeCandResponse : 0,
    langName : ''
}; // contains all the parameters which are common throughout the mock.

var result = {
    candidateId : '',
    mockId : 0,
    orgId : 0,
    questions : new Array()
};

function QuestionResultBean(quesId, quesType, langId, givenAns, marksObtained, quesStatus, GWPM, NWPM, accuracy) {
    this.quesId = quesId;
    this.quesType = quesType;
    this.langId = langId;
    this.givenAns = givenAns;
    if ((this.givenAns==null)||(this.givenAns=='')) {
        this.givenAns = '0';
    }
    this.marksObtained = marksObtained;
    this.quesStatus = quesStatus;
    this.GWPM = GWPM;
    this.NWPM = NWPM;
    this.accuracy = accuracy;
}

function getCookie() {
    var i, x, y, defLang = "", langName = "", ARRcookies = document.cookie.split(";");
    if (ARRcookies != null && ARRcookies != "") {
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == "defaultLang") {
                defLang = y;
            } else if (x == "viewLangName") {
                langName = y;
            }
        }
    } else {
        window.location.href = "error8.html?E103";
    }
    if ((defLang != null && defLang != "") || (langName != null || langName != "")) {
        iOAP.defaultLang = unescape(defLang);
        mockVar.langName = (langName != null && langName != "") ? unescape(langName) : "English";
    } else {
        window.location.href = "error9.html?E103";
    }
}

function questions(quesText, quesNo, quesType, options, answer, isParent, allottedMarks, negMarks, keyboardType, typingType, typedWord, correctAnswer, answerType, isCaseSensitive, quesID) {
    this.quesText = quesText;
    this.quesNo = quesNo;
    this.answer = answer;
    this.typedWord = typedWord;
    this.options = options;
    this.quesType = quesType;
    this.isParent = isParent;
    this.allottedMarks = allottedMarks;
    this.negMarks = negMarks;
    this.keyboardType = keyboardType;
    this.typingType = typingType;
    this.correctAnswer = correctAnswer;
    this.answerType = answerType;
    this.isCaseSensitive = isCaseSensitive;
    this.quesID = quesID;
    this.isEvaluated = false;
    this.isCorrect = false;
    this.programingStatus = '';
    this.quesAnsStatus = 'Unanswered';
}


function secBean(secName, answered, notanswered, marked, isOptional, secType) {
    this.secName = secName;
    this.answered = answered;
    this.notanswered = notanswered;
    this.marked = marked;
    this.isOptional = isOptional;
    this.secType = secType;
    this.isSelected = false;
    this.maxOptQuesToAns = "";
    this.curQues = 1;
    this.sectionScore = 0;
    this.totalEvaluatedQues = 0;
    this.totalCorrectQues = 0;
}

function quesParams(langID, status) {
    this.langID = langID;
    this.status = status;
}


function validateQuizPageUrl(user_name, full_name) {
    var url = document.URL;
    var params = url.split("quiz.html?");
    var orgId = $.trim(params[1]).split("@@")[0];
    var mockId = $.trim(params[1]).split("@@")[1];
    if (mockId != null && mockId.length > 0) {
        if (mockId.indexOf("#")>-1) {
            mockId = mockId.substring(0, mockId.indexOf("#"));
        }
        if (params.length > 1 && $.trim(params[1]).length > 0) {
            validateExpiry(orgId, mockId);
            var xml = readAndReturnXML(orgId + '/' + mockId + '/confDetails.xml');
            basicDetails(xml);
            mockVar.isFeedBackRequired = $(xml).find("FEEDBACKREQUIRED").text();
            mockVar.showEmailId = $(xml).find("SHOWEMAILID").text();
            mockVar.showContactNo = $(xml).find("SHOWCONTACTNO").text();
            if ($(xml).find("SHOWEMAILID").text() == "YES") {
                $("#emailId").html("<b> : </b>somebody@gmail.com ");
            }

            if ($(xml).find("SHOWCONTACTNO").text() == "YES") {
                $("#contactNo").html("<b> : </b>9999999999");
            }

            /*
             * //Check of backward compatibility. The GROUPDEPENDENTTIME tag is
             * not present in the older versions (v10)
             * if($(xml).find("GROUPDEPENDENTTIME").length>0){
             * if($(xml).find("GROUPDEPENDENTTIME").text().toUppercase()="YES"){
             * mockVar.isGroupDependentTime = true; }else{
             * mockVar.isGroupDependentTime = false; }
             *
             * if($(xml).find("SHOWATTEMPTEDGROUPS").text().toUppercase()="YES"){
             * mockVar.showAttemptedGroups = true; }else{
             * mockVar.showAttemptedGroups = false; }
             *
             * if($(xml).find("EDITATTEMPTEDGROUPS").text().toUppercase()="YES"){
             * mockVar.editAttemptedGroups = true; }else{
             * mockVar.editAttemptedGroups = false; }
             *
             *
             * }else{ mockVar.isGroupDependentTime = true; }
             */
            if (iOAP.defaultLang == null || iOAP.defaultLang == "") {
                //getCookie();
            }
            mockVar.orgId = orgId;
            mockVar.mockId = mockId;
            mockVar.my_username = user_name;
            mockVar.my_fullname = full_name;
            restoreMockOnRefresh();
            loadLabel();
            readSysInstructionsXMLQuizPage(xml, orgId, mockId);
        }
    } else {
        window.location.href = "error0.html";
    }

    /*
     * else{ window.location.href="error.html"; }
     */
}

function restoreMockOnRefresh() {
    try {
        // if JSON string(of mockVar) window.name is not null or does contain
        // mockId then restore mockVar obj
        if (window.name != "" && (JSON.parse(window.name)).mockId != "undefined") {
            mockVar = JSON.parse(window.name);
            //	mockVar.time = mockVar.timeLeft;
        }
    } catch (exc) {
    }
}

function readSysInstructionsXMLQuizPage(xml, orgId, mockId) {
    var useSystemInstructions = $(xml).find("USESYSTEMINSTRUCTIONS").text();
    var compMockTime = $(xml).find("COMPLETEMOCKDURATION").text();
    mockVar.completeTime = compMockTime;
    var counter = 1;
    var langId = 1;
    /*
     * var tempcounter =0; while(counter!=tempcounter){ tempcounter = counter;
     * $(xml).find("USEFULDATAFILE"+counter).each(function(){
     * if($(this).text()!=null && $.trim($(this).text()) != ""){
     * mockVar.helpContent[counter] = $(this).text();
     * mockVar.isHelpContentAvailable = true; } counter++; }); }
     */
    for (counter = 1; counter <= 15; counter++) {
        $(xml).find("USEFULDATAFILE" + counter).each(function() {
                                                     if ($(this).text() != null && $.trim($(this).text()) != "") {
                                                     mockVar.helpContent[counter] = $(this).text();
                                                     mockVar.isHelpContentAvailable = true;
                                                     }
                                                     });
    }

    mockVar.minSubmitTime = $(xml).find("COMPULSORYTIME").text();
    var isOptionalSectionsAvailable = $(xml).find("ISOPTIONALSECTIONSAVAILABLE").text();
    var isMarkedForReviewConsidered = $(xml).find("ISMARKEDFORREVIEWCONSIDERED").text();
    mockVar.isMarkedForReviewConsidered = isMarkedForReviewConsidered;
    if ($(xml).find("USEBANNER").text().toLowerCase() == "yes") {
        $("#bannerImage").html("<img height= '45px' src='" + $(xml).find("BANNERPATH").text() + "'/>");
    } else {
        $("#bannerImage").html('<div style="margin-top:10px"><font size=4 color="#ffffff"><b>' + $(xml).find("BANNERTEXT").text() + '</b></font></div>');
        $("#bannerImage").attr("align", "center");
    }
    $("#footer").html("<div style='width:100%;padding-top:15px;'><center><font color='white'> Version : " + $(xml).find("VERSION").text() + "</font></center></div>");
    if (useSystemInstructions.toUpperCase() == "NO") {
        var xml = readAndReturnXML(orgId + '/sysInstructions.xml');
        parseSysInstructions('quiz', xml, useSystemInstructions.toUpperCase(), orgId, mockId, isOptionalSectionsAvailable.toUpperCase(), isMarkedForReviewConsidered.toUpperCase(), compMockTime);
    } else {
        var xml = readAndReturnXML(orgId + '/' + 'sysInstructions.xml');
        parseSysInstructions('quiz', xml, useSystemInstructions.toUpperCase(), orgId, mockId, isOptionalSectionsAvailable.toUpperCase(), isMarkedForReviewConsidered.toUpperCase(), compMockTime);
    }

    if (document.getElementById("basInst").options.length > 1) {
        $('#basInst').parent().show();
        $('#cusInst').parent().show();
    }

    if ($('#basInst option:selected').val().indexOf('sysInstText')>-1)
        langId = $('#basInst option:selected').val().split('sysInstText')[1];
    $('#sysInstText' + langId).show();
    $('#cusInstText' + langId).show();
    var QPxml = readAndReturnXML(orgId + '/' + mockId + '/quiz.xml');
    readXMLQuestionPaper(QPxml);
}


function renderQuestions(xml, selectorElement) {
    $(xml).find(selectorElement).each(function() {
                                      // iOAP = groupObj;
                                      /*
                                       * iOAP.secDetails = new Array(); iOAP.languages = new Array();
                                       * iOAP.sections = new Array(); iOAP.viewLang = new Array();
                                       */
                                      iOAP = new createNewGroupObj();
                                      typingGrpObj = new typingObject();
                                      $(this).find("SECTION").each(function() {
                                                                   secCounter = $(this).find("secID").text();
                                                                   langCounter = $(this).find("LANGID").text();
                                                                   quesCounter = 1;

                                                                   if (iOAP.secDetails[secCounter] == null) {
                                                                   var secName = $(this).find("secName").text();
                                                                   var answered = 0;
                                                                   var notanswered = 0;
                                                                   var marked = 0;
                                                                   var isOptional = $(this).attr("ISOPTIONAL");
                                                                   if (isOptional == 'Y') {
                                                                   iOAP.noOptSec++;
                                                                   }
                                                                   var secType = $(this).attr('TYPE') ? $(this).attr('TYPE'): "";
                                                                   if (secType == "TYPING") {
                                                                   iOAP.isTypingGroup = true;
                                                                   } else if (secType == "OFFLINE") {
                                                                   iOAP.hasOfflineSect = true;
                                                                   }
                                                                   iOAP.secDetails[secCounter] = new secBean(secName, answered, notanswered, marked, isOptional, secType);
                                                                   if ($(this).attr("MAXQUESTOANS") != null || $(this).attr("MAXQUESTOANS") != "") {
                                                                   iOAP.secDetails[secCounter].maxOptQuesToAns = parseInt($(this).attr("MAXQUESTOANS"));
                                                                   }
                                                                   }

                                                                   if (iOAP.languages[langCounter] == null) {
                                                                   iOAP.languages[langCounter] = $(this).find("LANGNAME").text();
                                                                   }

                                                                   if (iOAP.sections[secCounter] == null) {
                                                                   iOAP.sections[secCounter] = new Array();
                                                                   }

                                                                   if (iOAP.sections[secCounter][langCounter] == null) {
                                                                   iOAP.sections[secCounter][langCounter] = new Array();
                                                                   }
                                                                   if (iOAP.viewLang[secCounter] == null) {
                                                                   iOAP.viewLang[secCounter] = new Array();
                                                                   }
                                                                   $(this).find("QUESTION").each(function() {
                                                                                                 var quesText = $(this).find("NAME").text();
                                                                                                 var quesType = $(this).attr("TYPE");
                                                                                                 var options = new Array();
                                                                                                 var correctAnswer = new Array(), correctAnswerCounter = 0;
                                                                                                 if (quesType != "SA" || quesType != "SUBJECTIVE" || quesType != "COMPREHENSION@@SA") {
                                                                                                 var optCounter = 0;
                                                                                                 $(this).find("ANSWER").each(function() {
                                                                                                                             options[optCounter] = $(this).text();
                                                                                                                             optCounter++;
                                                                                                                             if ($(this).attr('CORRECT') == 'TRUE') {
                                                                                                                             correctAnswer[correctAnswerCounter] = $(this).attr('VALUE');
                                                                                                                             correctAnswerCounter++;
                                                                                                                             }
                                                                                                                             });
                                                                                                 }
                                                                                                 if (iOAP.viewLang[secCounter][quesCounter] == null) {
                                                                                                 if (iOAP.defaultLang == null || iOAP.defaultLang == "") {
                                                                                                 getCookie();
                                                                                                 }
                                                                                                 iOAP.viewLang[secCounter][quesCounter] = new quesParams(iOAP.defaultLang, 'notAttempted');
                                                                                                 }
                                                                                                 var isParent = false;
                                                                                                 var keyboardType = 0;
                                                                                                 var answerType = '', isCaseSensitive = '';
                                                                                                 var typingType = 0;
                                                                                                 if (quesType.indexOf("LA")>-1 || quesType.indexOf("COMPREHENSION")>-1) {
                                                                                                 if ($(this).attr("ISPARENT") == "Y")
                                                                                                 isParent = true;
                                                                                                 }
                                                                                                 if (quesType.indexOf("SA")>-1) {
                                                                                                 keyboardType = $(this).find("KEYBOARDTYPE").text();
                                                                                                 $(this).find('ANSWER').each(function() {
                                                                                                                             answerType = $(this).attr('TYPE');
                                                                                                                             isCaseSensitive = $(this).attr('CASESENSITIVE');
                                                                                                                             correctAnswer[correctAnswerCounter] = $(this).text();
                                                                                                                             });
                                                                                                 } else if (quesType.indexOf('TYPING')>-1) {
                                                                                                 typingType = $(this).find("TYPINGTYPE").text();
                                                                                                 }
                                                                                                 var quesID = $(this).find("ID").text();
                                                                                                 var allottedMarks = $(this).find("ALLOTTEDMARKS").text();
                                                                                                 var negMarks = $(this).find("NEGATIVEMARKS").text();

                                                                                                 var question = new questions(quesText, quesCounter, quesType, options, '', isParent, allottedMarks, negMarks, keyboardType, typingType, '', correctAnswer, answerType, isCaseSensitive, quesID);
                                                                                                 iOAP.sections[secCounter][langCounter][quesCounter] = question;
                                                                                                 quesCounter++;
                                                                                                 });
                                                                   });
                                      mockVar.groups.push(iOAP);
                                      mockVar.typingGroup.push(typingGrpObj);
                                      });
}

function readXMLQuestionPaper(xml) {
    mockVar.time = mockVar.time * 60;

    // alert(mockVar.time+":::"+mockVar.minSubmitTime);
    iOAP.maxNoOptSec = $(xml).find("MAXNOOPTSEC").text();
    var isShowMarks = $(xml).find("SHOWMARKS").text();
    mockVar.showMarks = (isShowMarks.toUpperCase() == "YES") ? true : false;

    mockVar.mcQName = $.trim($(xml).find("mcQName").text());
    mockVar.msQName = $.trim($(xml).find("msQName").text());
    mockVar.compQName = $.trim($(xml).find("compQName").text());
    mockVar.laQName = $.trim($(xml).find("laQName").text());
    mockVar.saQName = $.trim($(xml).find("saQName").text());
    mockVar.subjQName = $.trim($(xml).find("subjQName").text());
    mockVar.typingQName = $.trim($(xml).find("typingQName").text());
    mockVar.programingQName = $.trim($(xml).find("programingQName").text());

    // To handle older mock which do not contain <GROUP> tag in the XML.
    // Backward compatibility
    mockVar.nonTimeBoundTime = 0;
    // Convert total time to seconds
    mockVar.completeTime = mockVar.completeTime * 60;
    mockVar.minSubmitTime = mockVar.completeTime * mockVar.minSubmitTime / 100;
    // alert();
    if ($(xml).find("GROUP").length > 0) {
        renderQuestions(xml, "GROUP");
        var counter = 0;
        var totTimeBoundTime = 0;
        var firstNonTimeBoundGrp = true;
        $(xml).find("GROUP").each(function() {
                                  mockVar.groups[counter].maxTime = parseInt($(this).attr("MAXTIME")) * 60;
                                  if ($(this).attr("MAXTIME") > 0) {
                                  totTimeBoundTime += parseInt($(this).attr("MAXTIME")) * 60;
                                  } else if ( firstNonTimeBoundGrp && $(this).attr("MAXTIME") == 0) {
                                  mockVar.groups[counter].firstNonTimeBoundGrp = true;
                                  firstNonTimeBoundGrp = false;
                                  }
                                  mockVar.groups[counter].minTime = parseInt($(this).attr("MINTIME")) * 60;
                                  mockVar.groups[counter].breakTime = parseInt($(this).attr("BREAKTIME")) * 60;
                                  mockVar.groups[counter].isViewable = $(this).attr("ISVIEWABLE").toUpperCase();
                                  mockVar.groups[counter].isEditable = $(this).attr("ISEDITABLE").toUpperCase();
                                  mockVar.groups[counter].groupName = $(this).find("GROUPNAME").text();
                                  mockVar.groups[counter].maxNoOptSec = $(this).find("MAXNOOPTSEC").text();
                                  counter++;
                                  });
        mockVar.nonTimeBoundTime = mockVar.completeTime - totTimeBoundTime;
    } else {
        renderQuestions(xml, "SECTIONDETAILS");
        mockVar.groups[0].maxNoOptSec = $(xml).find("MAXNOOPTSEC").text();
        mockVar.groups[0].minTime = mockVar.minSubmitTime;
        mockVar.groups[0].maxTime = mockVar.completeTime;
    }

    mockVar.currentGrp = 0;
    mockVar.MaxGrpEnabled = 0;
    if (mockVar.submitted = false){
        iOAP = mockVar.groups[mockVar.currentGrp];
    }
    mockVar.groups[mockVar.currentGrp].isDisabled = false;
    if (mockVar.submitted = false){
        mockVar.time = mockVar.completeTime;
    } else if (mockVar.groups[mockVar.currentGrp].maxTime > 0) {
        mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
    } else if (mockVar.groups.length > 1 && mockVar.groups[mockVar.currentGrp].maxTime == 0) {
        mockVar.time = mockVar.nonTimeBoundTime;
    } else {
        mockVar.time = mockVar.completeTime;
    }
    mockVar.minSubmitTime = mockVar.groups[mockVar.currentGrp].minTime;
    restoreMockOnRefresh();
    numPanelSec();
    getQuestion();
    fillSections();
    fillNumberPanel();
    if (iOAP.noOptSec > 0) {
        $('#showOptionalSecSummary').show();
        $('#noOptSec').html(iOAP.noOptSec);
        $('#maxOptSec').html(iOAP.maxNoOptSec);
    }

    if (iOAP.secDetails.length > 6 && !($.browser.msie) ) {
        $('#questionCont').css({
                               "height": "68%"
                               });
        $('#instructionsDiv').css({
                                  "height": "68%"
                                  });
        $('#profileDiv').css({
                             "height": "68%"
                             });
        $('#QPDiv').css({
                        "height": "68%"
                        });
        $('#sectionSummaryDiv').css({
                                    "height": "68%"
                                    });
    }
    $("#pWait").hide();

    $('#viewQPButton').removeAttr("disabled"); // View QP button is getting
    // disabled after refresh
    // because of
    // numpad_keyboard.js. Wierd
    // behaviour
    $('#viewProButton').removeAttr("disabled"); // View Profile button is
    // getting disabled after
    // refresh because of
    // numpad_keyboard.js. Wierd
    // behaviour
    $('#viewInstructionsButton').removeAttr("disabled");
}

function getQuestion() {
    // $("#loadCalc").hide();
    // $("#showCalc").show();
    var ques = iOAP.viewLang[iOAP.curSection][iOAP.curQues];
    if (ques.status == "notAttempted") {
        iOAP.viewLang[iOAP.curSection][iOAP.curQues].status = "notanswered";
        iOAP.secDetails[iOAP.curSection].notanswered++;
    }
    fillSections();

    var question = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
    $('#currentQues').html(quesContent(question));
    var quesText = question.quesText;
    if (quesText.indexOf("@@&&")>-1)
        quesText = quesText.split("@@&&")[1];
    if (quesText == null || quesText == "" || quesText == " ") {
        for (var i = 1; i < iOAP.languages.length; i++) {
            if (iOAP.languages[i] != null && typeof(iOAP.languages[i]) != 'undefined') {
                question = iOAP.sections[iOAP.curSection][i][iOAP.curQues];
                quesText = question.quesText;
                if (quesText.indexOf("@@&&")>-1)
                    quesText = quesText.split("@@&&")[1];
                if (!(quesText == null || quesText == "" || quesText == " ")) {
                    iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID = i;
                    break;
                }
            }
        }
        getQuestion();
    } else {
        $('#clearResponse').show();
        $('#sectionsField').show();
        $('#actionButton').show();
        $('.progrmngBtn').hide();
        $('.normalBtn').show();
        $('#legend').show();
        $('#quesPallet').show();
        $('#numberpanelQues').show();
        $('#typingSubmit').hide();
        $('#typingInstDiv').hide();
        if (mockVar.showCalculator)
            $('#showCalc').show();
        if (mockVar.isHelpContentAvailable) {
            if (mockVar.showCalculator)
                $('#usefulDataDivLeft').show();
            else
                $('#usefulDataDivRight').show();
        }
        if (question.quesType == "SA" || question.quesType == "LA@@SA" || question.quesType == "COMPREHENSION@@SA") {
            // numeric keyboard
            if (question.keyboardType == 1) {
                $('#numericKeyBoardDiv').remove();
                $('#answerArea').after("<div style='padding-left: 4%;' id='numericKeyBoardDiv'><input type='text' id='answer' class='keyboardInput answer'  value='" + question.answer + "'/></div>");
                triggerKeyboard(question.keyboardType);
            }
            // alphanumeric textarea
            else if (question.keyboardType == 2) {
                $('#answerArea').after('<div style="padding-left: 4%;"> <span id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;">' + question.typedWord + '</span><p> <textarea rows="7" cols="75" name="option"  autocomplete="off" id="answer" class="answer" onkeydown="disableTab(event); allowSAInputsForMultiLang(event);" onkeyup="word_count();">' + question.answer + '</textarea></p></div>');
                $('#clearResponse').hide();
            }
            if (iOAP.secDetails[iOAP.curSection].isOptional == 'Y' && !iOAP.secDetails[iOAP.curSection].isSelected) {
                if (question.keyboardType == 2)
                    $('#answer').attr('disabled', 'disabled');
            } else {
                focusOnDiv();
            }
        } else if (question.quesType == "PROGRAMING") {
            if (chkIfMaxQuesCrossed() || iOAP.secDetails[iOAP.curSection].isOptional == 'Y' && !iOAP.secDetails[iOAP.curSection].isSelected) {
                editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                                                 lineNumbers: true,
                                                 matchBrackets: true,
                                                 readOnly : 'nocursor'
                                                 });
            } else {
                editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                                                 lineNumbers: true,
                                                 styleActiveLine: true,
                                                 matchBrackets: true
                                                 });
            }
            $('.progrmngBtn').show();
            $('.normalBtn').hide();
            if (question.programingStatus == 'CompiledSuccess') {
                compileSuccessMsg();
            } else if (question.programingStatus == 'ExecutedSuccess') {
                executionSuccessMsg();
            }
        } else if (question.quesType == "TYPING") {
            focusOnDiv();
            $("#row1 span:first").addClass('highlight');
            $('#sectionsField').hide();
            $('.questionTypeCont .marks').hide();
            $('#actionButton').hide();
            $('#legend').hide();
            $('#quesPallet').hide();
            $('#numberpanelQues').hide();
            $('#typingSubmit').show();
            $('#typingInstDiv').show();
            $('#showCalc').hide();
            if (question.typingType == 1) {
                $('#errorCount').show();
                $('#restrictedInstr').show();
                $('#unrestrictedInstr').hide();
            } else {
                $('#errorCount').hide();
                $('#restrictedInstr').hide();
                $('#unrestrictedInstr').show();
            }
        }
    }
    /*
     * if(iOAP.curQues>19){ var el = document.getElementById(iOAP.curQues);
     * el.scrollIntoView(true); }
     */
    scrollIntoView(document.getElementById('qtd' + iOAP.curQues), document.getElementById('numberpanelQues'));
    enableOptButtons();
    chkIfMaxQuesCrossed();
    quizPageHeight();
}

function scrollIntoView(element, container) {
    try {
        // var containerTop = $(container).scrollTop();
        // var containerBottom = containerTop + $(container).height();
        var elemTop = element.offsetTop;
        $(container).scrollTop(elemTop - $(element).height());
    } catch (err) {
    }
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function chkIfMaxQuesCrossed() {
    var proceed = false;
    var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
    var questionStatus = iOAP.viewLang[iOAP.curSection][iOAP.curQues].status ;
    var section = iOAP.secDetails[iOAP.curSection];
    var quesToBeConsidered = parseInt(section.answered);
    if (section.maxOptQuesToAns != "") {
        if (mockVar.isMarkedForReviewConsidered == "YES") {
            var counter = 0;
            for (i = 1; i < iOAP.viewLang[iOAP.curSection].length; i++) {
                var quesStatus = iOAP.viewLang[iOAP.curSection][i].status ;
                if (quesStatus == "marked" && !(iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][i].langID][i].answer == null
                                                || iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][i].langID][i].answer == '')) {
                    counter++;
                }
            }
            quesToBeConsidered += counter;
        }
        if (quesToBeConsidered == section.maxOptQuesToAns && questionStatus != "answered") {
            fillMaxOptQuesCrossed(quesToBeConsidered, iOAP.viewLang[iOAP.curSection].length - 1);
            proceed = true;
        }
    }
    return proceed;
}

function bindCharCode() {
    $('input').bind('keydown', function(event) {
                    var code = (event.keyCode ? event.keyCode : event.which);
                    if (code == 8) {
                    $(this).val($(this).val().substring(0, $(this).val().length - 1));
                    } else if (!((code > 44 && code < 58) || (code > 64 && code < 91) || (code > 94 && code < 123) || code == 43 || code == 16 || code == 32)) {
                    return false;
                    }
                    });
}

function applyKeyboard() {
    var div = document.getElementById('currentQues');
    var input = div.getElementsByTagName('input');
    if (input.length) {
        VKI_attach(input[0]);
    }
}

function fillMCQQues (quesTxt, quesOpts, answer) {
    var str = "<div id='quesAnsContent' style='height:92%;overflow:auto;'>";
    str += "<div style='width:99%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'> " + quesTxt + "</div>";
    str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><table>";
    var answers = answer.split(",");
    if (mockVar.showOptionsHorizontally)
        str += '<tr>';
    for (var i = 0; i < quesOpts.length; i++) {
        if (!mockVar.showOptionsHorizontally)
            str += '<tr>';
        str += "<td><input type='radio' onMouseDown='this.check = this.checked' onClick='if (this.check) this.checked = false' class='answer' name='answers' value='" + (i + 1) + "' ";
        for (var j = 0; j < answers.length; j++) {
            if (answers[j] != "" && i == (answers[j] - 1))
                str += "checked";
        }
        str += "/> </td><td style='font-family:Arial,verdana,helvetica,sans-serif;padding-right:60px'>" + quesOpts[i] + " </td>";
        if (!mockVar.showOptionsHorizontally)
            str += '</tr>';
    }
    if (!mockVar.showOptionsHorizontally)
        str += '</tr>';
    str += "</table></div></div>";
    return str;
}

function fillMSQQues (quesTxt, quesOpts, answer) {
    var answers = answer.split(",");
    var str = "<div id='quesAnsContent' style='height:92%;overflow:auto;'>";
    str += "<div style='width:99%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'> " + quesTxt + "</div>";
    str += "<div style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><table>";
    if (mockVar.showOptionsHorizontally)
        str += '<tr>';
    for (var i = 0; i < quesOpts.length; i++) {
        if (!mockVar.showOptionsHorizontally)
            str += '<tr>';
        str += "<td><input type='checkbox' class='answer' name='answers' value='" + (i + 1) + "' ";
        for (var j = 0; j < answers.length; j++) {
            if (answers[j] != "" && i == (answers[j] - 1))
                str += "checked";
        }
        str += "/> </td><td style='font-family:Arial,verdana,helvetica,sans-serif;padding-right:60px'>" + quesOpts[i] + " </td>";
        if (!mockVar.showOptionsHorizontally)
            str += '</tr>';
    }
    if (!mockVar.showOptionsHorizontally)
        str += '</tr>';
    str += "</table></div></div>";
    return str;
}

function fillSAQues(quesTxt, answer) {
    var str = "<div id='quesAnsContent' style='height:92%;overflow:auto;'>";
    str += "<div style='width:99%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;padding-bottom:10px;'> " + quesTxt + "</div>";
    str += "<div id='answerArea' style='width:100%;font-family:Arial,verdana,helvetica,sans-serif;margin-top:5px;'><br/><br/></div></div>";
    return str;
}

function fillRestrictedTypingQues(quesTxt) {
    $('#dataDisplayDiv').html(quesTxt.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;'));
    mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping = $('#dataDisplayDiv').text();
    var str = loadTypingContentRestricted(); // in restrictedTyping.js
    return str;
}

function fillUnrestrictedTypingQues(quesTxt) {
    $('#dataDisplayDiv').html(quesTxt.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;'));
    mockVar.typingGroup[mockVar.currentGrp].word_string = $('#dataDisplayDiv').text();
    var str = loadTypingContentUnrestricted();
    return str;
}

function fillProgramingQues(ques) {
    var str = '<div style="width:100%;">';
    str += '<div id="compreText" style="width:49%;float:left;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif; overflow:auto;height:100%">';
    str += fillQuesNumber(ques);
    str += '<div id="quesAnsContent">' + ques.quesText;
    str += ' </div>';
    str += '<div id="progStatusDisplay" style="margin: auto;display:none;margin-bottom:0.1%;height:28%;border-top:1px solid">';
    str += '<div id="statusText" style="text-align:left;float:left;color:green;font-weight:bold;width:99.5%"></div><br/>This section displays the result of public test cases';
    str += '<div id="TestCaseReport" style="display:none;border-top:1px solid"><table id="testCaseDisplayTable" width="99.5%" border="1" cellSpacing="0" style="border-color:#2F72B7;" class="testCaseTable"><thead><tr style="background:#2F72B7;color:white"><th style="width:10%;">TestCase No</th><th style="width:40%;">Inputs</th><th style="width:25%;">Expected output</th><th style="width:25%;">Result</th></tr></thead><tbody><tr><td>1</td><td>Inputs for TestCase 1</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr><tr><td>2</td><td>Inputs for TestCase 2</td><td>Output</td><td style="font-weight: bold;"><span style="color:green;font-weight: bold;">Pass</span> / <span style="color:red;font-weight: bold;">Fail</span></td></tr></tbody></table></div>';
    str += '</div></div>';
    str += "<div id='programingAnsContent' style='height:100%;overflow:auto;'>";
    str += '<div id="progRightPart"><div id="progDescriptionDiv">' + mockLabels.typeCodeMsg + '</div>';
    str += '<div id="progEditorDisplay" style="overflow : auto;">';
    str += '<div id="progEditorDisplayDiv" style="margin:auto;height:97%"><textarea style="display: none;" id="code" name="code">' + ques.answer + '</textarea></div></div></div>';
    return str;
}

var allowedChars = new Array("+", "-");

function numPadValidate(text) {
    var proceed = true;
    for (var i = 0; i < allowedChars.length; i++) {
        if (text.indexOf(allowedChars[i]) > 0) {
            proceed = false;
        }
        if (text.split(allowedChars[i]).length > 2) {
            proceed = false;
        }
    }
    if (text.indexOf('.') > - 1) {
        var afterDot = text.split(".");
        if (afterDot.length == 2) {
            if (afterDot[1].length > 2)
                proceed = false;
        } else if (afterDot.length > 2) {
            proceed = false;
        }
    }
    return proceed;
}

function fillCompQues(ques) {
    var str = '<div style="width:100%; height:92%" id="quesOuterDiv">';
    str += '<div id="compreText" style="width:49%;float:left;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif; overflow:auto;height:100%">';
    str += (mockVar.compQName.length > 0) ? ('<table width="100%"><tr><td><div style="font-size:1em;font-family:Arial,verdana,helvetica,sans-serif"><b>' + mockVar.compQName + '</b></div></td></tr><tr><td><hr/></td></tr></table>') : "";
    str += ques.quesText.split("@@&&")[0] + ' </div>';
    return str;
}

function fillSubjectiveQues(quesTxt) {
    var str = "<div id='quesAnsContent' style='width:98%;height:92%;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;overflow:auto'> " + quesTxt + "</div>";
    return str;
}

function fillQuesNumber(ques) {
    var str = '<div id="quesNumberDiv" style="height:6%;border-bottom:1px solid #000000;margin:5px;"><div style="float : left;width:49%;font-size:1em;font-family:Arial,verdana,helvetica,sans-serif"><b>' + mockLabels.questionNo + '. ' + ques.quesNo + '</b></div><div style="width:49%;float:right;">';
    if (ques.quesType != 'PROGRAMING' && iOAP.languages.length > 2) {
        str += "<div style='float:right'> <b>" + mockLabels.viewIn + "</b> <select onchange='changeLang(this.value)'> ";
        for (var i = 1; i < iOAP.languages.length; i++) {
            if (iOAP.languages[i] != null && typeof(iOAP.languages[i]) != 'undefined') {
                str += "<option";
                if (i == iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID)
                    str += " selected='selected'";
                str += " value='" + i + "'>" + iOAP.languages[i] + "</option>";
            }
        }
        str += "</select></div>";
    }
    str += '</div></div>';
    return str;
}

function fillLAQuesNumber(ques) {
    var str = '<div id="quesNumberDiv" style="height:6%;border-bottom:1px solid #000000;margin:5px;"><div style="float : left;width:49%;font-size:1em;font-family:Arial,verdana,helvetica,sans-serif"><b>' + mockLabels.questionNo + '. ' + ques.quesNo;
    str += ($.trim(ques.quesText.split("@@&&")[0]).length <= 0 && mockVar.laQName.length > 0 ) ? (" (" + mockVar.laQName + ")") : "";
    str += '</b></div><div style="width:49%;float:right;">';
    if (iOAP.languages.length > 2) {
        str += "<div style='float:right'> " + mockLabels.viewIn + " <select onchange='changeLang(this.value)'> ";
        for (var i = 1; i < iOAP.languages.length; i++) {
            if (iOAP.languages[i] != null && typeof(iOAP.languages[i]) != 'undefined') {
                str += "<option";
                if (i == iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID)
                    str += " selected='selected'";
                str += " value='" + i + "'>" + iOAP.languages[i] + "</option>";
            }
        }
        str += "</select></div>";
    }
    str += '</div></div>';
    return str;
}

function fillLAQues(ques) {
    var str = '<div id="quesOuterDiv" style="width:100% ;height:92%">';
    str += '<div style="width:49%;float:left;margin-left:5px;font-family:Arial,verdana,helvetica,sans-serif;overflow:auto;height:98%">';
    str += (mockVar.laQName.length > 0) ? ('<table width="100%"><tr><td><div style="font-size:1em;font-family:Arial,verdana,helvetica,sans-serif"><b>' + mockVar.laQName + '</b></div></td></tr><tr><td><hr/></td></tr></table>') : '';
    str += "<p>" + ques.quesText.split("@@&&")[0] + "</p>";
    if (iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues - 1] != null) {
        parentQues = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues - 1];
        if (parentQues.isParent) {
            if ($.trim(parentQues.answer) != "") {
                str += "<p><i>Selected answer(s) of the previous question is :";
                if (parentQues.quesType.indexOf("SA") ==-1) {
                    var answers = parentQues.answer.split(",");
                    for (var j = 0; j < answers.length; j++) {
                        str += parentQues.options[answers[answers.length - j - 1]] + ",";
                    }
                    str = str.substring(0, str.length - 1);
                } else {
                    str += parentQues.answer;
                }

                str += "</i></p>";
            }
        }
    }
    str += ' </div>';
    return str;
}

function changeLang(langID) {
    // iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID = langID;
    var question = iOAP.sections[iOAP.curSection][langID][iOAP.curQues];
    var quesText = question.quesText;
    if (quesText.indexOf("@@&&")>-1)
        quesText = quesText.split("@@&&")[1];
    if (quesText == null || quesText == "" || quesText == " ") {
        alert(mockLabels.quesNotAvailable.replace('@@langName@@', iOAP.languages[langID]));
        question = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
        $('#currentQues').html(quesContent(question));
        if (question.quesType == "SA" || question.quesType == "LA@@SA" || question.quesType == "COMPREHENSION@@SA") {
            // numeric keyboard
            if (question.keyboardType == 1) {
                $('#numericKeyBoardDiv').remove();
                $('#answerArea').after("<div style='padding-left: 4%;' id='numericKeyBoardDiv'><input type='text' id='answer' class='keyboardInput answer'  value='" + question.answer + "'/></div>");
                triggerKeyboard(question.keyboardType);
            }
            // alphanumeric textarea
            else if (question.keyboardType == 2) {
                $('#answerArea').after('<div style="padding-left: 4%;"> <span id="noOfWords" name="noOfWords" style="font-size: 12px;color:#2F72B7;font-weight: bold;">' + question.typedWord + '</span><p> <textarea rows="7" cols="75" name="option"  autocomplete="off" class="answer" id="answer" onkeydown ="disableTab(); allowSAInputsForMultiLang(event);" onkeyup="word_count();">' + question.answer + '</textarea></p></div>');
            }
        }
        //	chkIfMaxQuesCrossed();
        //	quizPageHeight();
    } else {
        iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID = langID;
        getQuestion();
        fillNumberPanel();
    }
}

function fillQuesDetailsCont(ques) {
    var str = "";
    if (iOAP.showQType) {
        str += "<span class='content'>";
        if (ques.quesType == "MCQ" && $.trim(mockVar.mcQName).length > 0) {
            str += mockLabels.questionType + mockVar.mcQName;
        } else if (ques.quesType == "MSQ" && $.trim(mockVar.msQName).length > 0) {
            str += mockLabels.questionType + mockVar.msQName;
        } else if (ques.quesType == "SA" && $.trim(mockVar.saQName).length > 0) {
            str += mockLabels.questionType + mockVar.saQName;
        } else if (ques.quesType == "SUBJECTIVE" && $.trim(mockVar.subjQName).length > 0) {
            str += mockLabels.questionType + mockVar.subjQName;
        } else if (ques.quesType == "COMPREHENSION@@MCQ" && $.trim(mockVar.mcQName).length > 0) {
            str += mockLabels.questionType + mockVar.mcQName;
        } else if (ques.quesType == "COMPREHENSION@@MSQ" && $.trim(mockVar.msQName).length > 0) {
            str += mockLabels.questionType + mockVar.msQName;
        } else if (ques.quesType == "COMPREHENSION@@SA" && $.trim(mockVar.saQName).length > 0) {
            str += mockLabels.questionType + mockVar.saQName;
        } else if (ques.quesType == "LA@@MCQ" && $.trim(mockVar.mcQName).length > 0) {
            str += mockLabels.questionType + mockVar.mcQName;
        } else if (ques.quesType == "LA@@MSQ" && $.trim(mockVar.msQName).length > 0) {
            str += mockLabels.questionType + mockVar.msQName;
        } else if (ques.quesType == "LA@@SA" && $.trim(mockVar.saQName).length > 0) {
            str += mockLabels.questionType + mockVar.saQName;
        } else if (ques.quesType == "TYPING" && $.trim(mockVar.saQName).length > 0) {
            str += mockLabels.questionType + mockVar.typingQName;
        } else if (ques.quesType == "PROGRAMING" && $.trim(mockVar.saQName).length > 0) {
            str += mockLabels.questionType + mockVar.programingQName;
        }
        str += "</span>";
    }
    if (mockVar.showMarks) {
        str += "<span class='marks'>" + mockLabels.correctAnswerMarks + " <font style='color:green'>" + ques.allottedMarks + "</font>";
        str += "; " + mockLabels.negativeMarks + " <font style='color:red'>" + ques.negMarks + "</font></span>";
    }
    return str;
}

function quesContent(ques) {
    var str = '' ;
    $("#savenext").val(mockLabels.savenext) ;
    if (mockVar.showMarks || iOAP.showQType) {
        // console.log("in");

        if (ques.quesType == "MCQ" && ($.trim(mockVar.mcQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "MSQ" && ($.trim(mockVar.msQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "SA" && ($.trim(mockVar.saQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "SUBJECTIVE" && ($.trim(mockVar.subjQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "COMPREHENSION@@MCQ" && ($.trim(mockVar.mcQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "COMPREHENSION@@MSQ" && ($.trim(mockVar.msQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "COMPREHENSION@@SA" && ($.trim(mockVar.saQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "LA@@MCQ" && ($.trim(mockVar.mcQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "LA@@MSQ" && ($.trim(mockVar.msQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "LA@@SA" && ($.trim(mockVar.saQName).length > 0 || mockVar.showMarks)) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "TYPING" && $.trim(mockVar.typingQName).length > 0) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        } else if (ques.quesType == "PROGRAMING" && $.trim(mockVar.programingQName).length > 0) {
            str = "<div class='questionTypeCont'>";
            str += fillQuesDetailsCont(ques);
            str += "</div>";
        }
    }

    if (ques.quesType == "MCQ") {
        str += "<div style='height:92%;width:100%' id='quesOuterDiv'>";
        str += fillQuesNumber(ques);
        str += fillMCQQues(ques.quesText, ques.options, ques.answer);
        str += "</div>";
    } else if (ques.quesType == "MSQ") {
        str += "<div style='height:92%;width:100%' id='quesOuterDiv'>";
        str += fillQuesNumber(ques);
        str += fillMSQQues(ques.quesText, ques.options, ques.answer);
        str += "</div>";
    } else if (ques.quesType == "SA") {
        str += "<div style='height:92%;width:100%' id='quesOuterDiv'>";
        str += fillQuesNumber(ques);
        str += fillSAQues(ques.quesText, ques.answer, ques.quesNo);
        str += "</div>";
    } else if (ques.quesType == "SUBJECTIVE") {
        $("#savenext").val(mockLabels.markAsAnswered) ;
        str += "<div style='height:92%;' id='quesOuterDiv'>";
        str += fillQuesNumber(ques);
        str += fillSubjectiveQues(ques.quesText);
        str += "</div>";
    } else if (ques.quesType == "COMPREHENSION@@MCQ" || ques.quesType == "COMPREHENSION@@MSQ" || ques.quesType == "COMPREHENSION@@SA") {
        str += fillCompQues(ques);
        str += '<div id="compreQuesText" style="width:49%;float:right;border: solid 0 #000; border-left-width:1px;height:100%">';
        str += fillQuesNumber(ques);
        if (ques.quesType == "COMPREHENSION@@MCQ" ) {
            str += fillMCQQues(ques.quesText.split("@@&&")[1], ques.options, ques.answer);
        } else if (ques.quesType == "COMPREHENSION@@MSQ" ) {
            str += fillMSQQues(ques.quesText.split("@@&&")[1], ques.options, ques.answer);
        } else if (ques.quesType == "COMPREHENSION@@SA" ) {
            str += fillSAQues(ques.quesText.split("@@&&")[1], ques.answer);
        }
        str += '</div></div>';
    } else if (ques.quesType == "LA@@MCQ" || ques.quesType == "LA@@MSQ" || ques.quesType == "LA@@SA") {
        var laQues = ques.quesText.split("@@&&");
        if ($.trim(laQues[0]).length > 0) {
            str += fillLAQues(ques);
            str += '<div id="LAQuesText" style="width:49%;float:right;border: solid 0 #000; border-left-width:1px;height:100%">';
        } else {
            str += "<div id='LAQuesText' style='height:93%;'>";
        }
        str += fillLAQuesNumber(ques);
        if (ques.quesType == "LA@@MCQ" ) {
            str += fillMCQQues(ques.quesText.split("@@&&")[1], ques.options, ques.answer);
        } else if (ques.quesType == "LA@@MSQ" ) {
            str += fillMSQQues(ques.quesText.split("@@&&")[1], ques.options, ques.answer);
        } else if (ques.quesType == "LA@@SA" ) {
            str += fillSAQues(ques.quesText.split("@@&&")[1], ques.answer);
        }
        if ($.trim(str.split("@@&&")[1]).length > 0)
            str += '</div></div>';
    } else if (ques.quesType == "TYPING") {
        str += "<div style='height:92%;' id='quesOuterDiv'>";
        // str += fillQuesNumber(ques);
        if (ques.typingType == 1) {
            // for Restricted Typing
            str += fillRestrictedTypingQues(ques.quesText);
        } else if (ques.typingType == 2) {
            // for Unrestricted typing
            str += fillUnrestrictedTypingQues(ques.quesText);
        }
        str += "</div>";
    } else if (ques.quesType == "PROGRAMING") {
        str += "<div style='height:92%;' id='quesOuterDiv'>";
        //str += fillQuesNumber(ques);
        str += fillProgramingQues(ques);
        str += "</div>";
    }
    return str;
}

function changeHelpLang(langId) {
    var str = "<div style='width:100%;height:90%;overflow:auto;border-bottom : 2px solid #CCCCCC'>";
    if (iOAP.languages.length > 2) {
        str += "<div style='width:100%'>";
        str += "<span style='float:right'> " + mockLabels.viewIn + " <select onchange='changeHelpLang(this.value)'> ";
        for (var i = 1; i < iOAP.languages.length; i++) {
            if (iOAP.languages[i] != null && typeof(iOAP.languages[i]) != 'undefined') {
                str += "<option";
                if (i == langId)
                    str += " selected='selected'";
                str += " value='" + i + "'>" + iOAP.languages[i] + "</option>";
            }
        }
        str += "</select></span></div>";

    }
    if (mockVar.helpContent[langId] != null && $.trim(mockVar.helpContent[langId]) != "") {
        str += "<img src='" + mockVar.helpContent[langId] + "'/>";
    } else {
        str += "Help content is not available in the language selected";
    }
    str += "</div>";
    str += "<div style='overflow : hidden;'><table align='center'>";
    str += '<tr><td  style="text-align:center; padding-top : 5%"><input onclick="showModule(';
    str += "'questionCont'";
    str += ')" type="button" class="button" value="' + mockLabels.back + '"/></td></tr></table></div>';
    $('#sectionSummaryDiv').html(str);
    showModule('sectionSummaryDiv');
}

function showHelpContent(event) {
    if (avoidKeyPressing(event)) {
        var str = '<div style="overflow : auto; height : 90%; border-bottom : 2px solid #CCCCCC">';
        if (iOAP.languages.length > 2) {
            str += "<div style='float:right'> " + mockLabels.viewIn + " <select onchange='changeHelpLang(this.value)'> ";
            for (var i = 1; i < iOAP.languages.length; i++) {
                if (iOAP.languages[i] != null && typeof(iOAP.languages[i]) != 'undefined') {
                    str += "<option";
                    if (i == iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID)
                        str += " selected='selected'";
                    str += " value='" + i + "'>" + iOAP.languages[i] + "</option>";
                }
            }
            str += "</select></div>";
        }
        if (mockVar.helpContent[iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID] != null && $.trim(mockVar.helpContent[iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID]) != "") {
            str += "<img src='" + mockVar.helpContent[iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID] + "'/>";
        } else {
            str += "Help content is not available in the language selected";
        }
        str += "</div>";
        str += "<div style='overflow : hidden;'><table align='center'>";
        str += '<tr><td  style="text-align:center; padding-top : 5%"><input onclick="showModule(';
        str += "'questionCont'";
        str += ')" type="button" class="button" value="' + mockLabels.back + '"/></td></tr></table></div>';
        $('#sectionSummaryDiv').html(str);
        showModule('sectionSummaryDiv');
    }
}

function fillGroups() {
    iOAP = mockVar.groups[mockVar.currentGrp];
    $("#groups").empty();
    var tempstr = "" ;
    $("#groups").html(tempstr);
    if (mockVar.groups.length > 1) {

        str = "<table width='100%'>";
        var tempiOAP ;
        for (var i = 0; i < mockVar.groups.length ; i++) {
            tempiOAP = mockVar.groups[i];
            var langId = 0;
            var answeredQuestions = 0;
            var notAnsweredQuestions = 0;
            var markedQuestions = 0;
            var noOfQuestions = 0;
            var notAttemptedQuestions = 0;
            var grossKeyStrokesCount = 0;
            var backSpaceCount = 0;
            for (var k = 1; k < iOAP.languages.length; k++) {
                if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
                    langId = k;
                    break;
                }
            }
            if (tempiOAP.secDetails[1].secType == 'TYPING') {
                grossKeyStrokesCount = mockVar.typingGroup[i].keyStrokesCount;
                backSpaceCount = mockVar.typingGroup[i].backSpaceCount;
                ellapsedTime = mockVar.typingGroup[i].ellapsedTime;
            }
            for (var j = 1; j < tempiOAP.secDetails.length; j++) {
                answeredQuestions += tempiOAP.secDetails[j].answered;
                notAnsweredQuestions += tempiOAP.secDetails[j].notanswered;
                markedQuestions += tempiOAP.secDetails[j].marked;
                noOfQuestions += tempiOAP.sections[j][langId].length;
                notAttemptedQuestions += tempiOAP.sections[j][langId].length - tempiOAP.secDetails[j].marked - tempiOAP.secDetails[j].notanswered - tempiOAP.secDetails[j].answered - 1;
            }
            if (i%5 == 0) {
                str += "</td></tr>";
                str += "<tr><td>";
            }
            str += '<div class="allSections" id="g' + i + '" ><a href="#" class="tooltip';

            if (mockVar.groups[i].isDisabled) {
                str += " disabled ";
            }

            str += '">';
            str += '<div style="text-overflow:ellipsis;width:90%;overflow:hidden;white-space:nowrap;padding-left:10px;cursor:pointer;">';

            str += mockVar.groups[i].groupName + '</div>';
            if (!mockVar.groups[i].isDisabled) {
                if (!(i == mockVar.MaxGrpEnabled && mockVar.groups[i].isTypingGroup)) {
                    str += '<span class="classic"><center><table width="95%" style="font-size:14px;margin-top:10px" class="question_area" cellspacing="0">';
                    str += '<tr><td colspan="2"><b>' + mockVar.groups[i].groupName + '</b></td></tr>';
                    str += '<tr><td colspan="2"><hr/></td></tr></table>';
                    str += '<table width="95%" style="margin-top:0%" class="question_area" cellspacing="5">';
                    if (mockVar.groups[i].isTypingGroup) {
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.keyStrokesCount + ': </td><td valign="top">' + grossKeyStrokesCount + '</td></tr>';
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.backspaceCount + ': </td><td valign="top">' + backSpaceCount + '</td></tr>';
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.elapsedTime + ': </td><td valign="top">' + (ellapsedTime / 60).toFixed(2) + '</td></tr>';
                        str += '</table></center></span>';
                    } else {
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.answered + ': </td><td valign="top"><span id="tooltip_answered">' + answeredQuestions + '</span></td></tr>';
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.notAnswered + ': </td><td valign="top"><span  id="tooltip_not_answered">' + notAnsweredQuestions + '</span></td></tr>';
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.markReview + ': </td><td valign="top"><span id="tooltip_review">' + markedQuestions + '</span></td></tr>';
                        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.notAttempted + ': </td><td valign="top"><span id="tooltip_not_visited">' + notAttemptedQuestions + '</span></td></tr>';
                        str += '</table></center></span>';
                    }
                }
            }
            str += '</a></div>';
        }
        str += "</td></tr></table>";

        $('#groups').append(str);
        // align
        if ( mockVar.groups.length > 4 && ($.browser.msie) ) {
            for (var i = 4; i < iOAP.secDetails.length; i = i + 5) {
                $('#g' + (i + 1) + " .tooltip").hover(
                                                      function() {
                                                      $(this).find(".classic").css({
                                                                                   "margin-left": "-60px"
                                                                                   });
                                                      }, function() {
                                                      $(this).find(".classic").css({
                                                                                   "margin-left": "-999px"
                                                                                   });
                                                      });
            }
        }

        $("#g" + mockVar.currentGrp).addClass("currentSectionSelected");
        if (!mockVar.groups[mockVar.MaxGrpEnabled].isTypingGroup) {
            $("#g" + mockVar.currentGrp + " a").addClass("tooltipSelected");
        } else {
            $("#g" + mockVar.currentGrp + " a").addClass("tooltipSelected");
        }

        $("#groups .allSections").click(function (event) {
                                        if (event.target.type != "checkbox") {
                                        changeGroup(this.id.split("g")[1]);
                                        }
                                        });
    }
}

function checkGroupBreakTime() {
    if (mockVar.currentGrp < mockVar.groups.length - 1) {
        if (!(mockVar.groups[mockVar.currentGrp].breakTime == 0)) {
            clearTimeout(mockVar.timeCounter);
            mockVar.timeCounter = mockVar.groups[mockVar.currentGrp].breakTime;
            breakTimeCounter(mockVar.timeCounter);
            submitConfirmation('break');
        } else {
            saveQuestionAutomatically();
            submitGroup();
        }
    } else {
        submitMock();
    }
}

function submitGroup() {
    // if(mockVar.currentGrp)

    // if(mockVar.currentGrp < mockVar.groups.length-1){
    if (document.getElementById('typedAnswer')) {
        fnSubmit('NEXT');
        $('#typedAnswer').attr('disabled', true);
        $('#finalTypingSub').attr('disabled', true);
        $('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled');
    }
    $('#breakTimeDiv').hide();
    $('#questionContent').show();
    if (mockVar.groups[mockVar.currentGrp].maxTime == 0) {
        mockVar.nonTimeBoundTime = mockVar.time ;
    }
    mockVar.currentGrp++;
    mockVar.MaxGrpEnabled = mockVar.currentGrp;
    if (mockVar.groups[mockVar.currentGrp].maxTime > 0) {
        mockVar.time = mockVar.groups[mockVar.currentGrp].maxTime;
    } else {
        mockVar.time = mockVar.nonTimeBoundTime;
    }
    mockVar.groups[mockVar.currentGrp].isDisabled = false;
    mockVar.minSubmitTime = mockVar.groups[mockVar.currentGrp].minTime;
    showModule("questionCont");
    fillGroups();
    getQuestion();
    numPanelSec();
    fillSections();
    enableOptButtons();
    fillNumberPanel();
    clearTimeout(mockVar.timeCounter);
    mockVar.timeCounter = setTimeout(function() {
                                     startCounter(mockVar.time - 1);
                                     }, 1000);

    /*
     * }else{ submitMock(); //submit exam }
     */
    if (iOAP.noOptSec > 0) {
        $('#noOptSec').html(iOAP.noOptSec);
        $('#maxOptSec').html(iOAP.maxNoOptSec);
        $("#showOptionalSecSummary").show();
    } else {
        $("#showOptionalSecSummary").hide();
    }
}

function changeGroup(id) {
    if (mockVar.MaxGrpEnabled >= id && !mockVar.groups[mockVar.MaxGrpEnabled].isTypingGroup) {
        if ((!mockVar.groups[id].isDisabled && mockVar.groups[id].isViewable == "Y") || mockVar.MaxGrpEnabled == id) {
            mockVar.currentGrp = id;
            saveQuestionAutomatically();
            fillGroups();
            getQuestion();
            if ($('#typedAnswer')) {
                $('#typedAnswer').attr('disabled', true);
                $('#finalTypingSub').attr('disabled', true);
                $('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled');
            }
            doCalculations(0, 0);
            numPanelSec();
            fillSections();
            enableOptButtons();
            fillNumberPanel();
            if (iOAP.noOptSec > 0) {
                $('#noOptSec').html(iOAP.noOptSec);
                $('#maxOptSec').html(iOAP.maxNoOptSec);
                $("#showOptionalSecSummary").show();
            } else {
                $("#showOptionalSecSummary").hide();
            }
        } else {
            var str = "<br/><center>You have already attempted " + mockVar.groups[id].groupName + " group. Viewing or editing this group is not allowed</center>";
            str += "<table class='bordertable' cellspacing=0 width='80%' align='center' style='margin-top:10px'>";
            str += "<tr><th>Section Name</th><th>No. of Questions</th><th>Answered</th><th>Not Answered</th><th>Marked for Review</th><th>Not Visited</th></tr>";
            var temp_iOAP = mockVar.groups[id];
            var noOfAns = 0, noOfNtAns = 0, noOfReview = 0, totalQues = 0, noOfNtAttemp = 0;
            for (var i = 1; i < temp_iOAP.secDetails.length; i++) {
                if (temp_iOAP.secDetails[i].isOptional == 'N') {
                    str += "<tr><td>" + temp_iOAP.secDetails[i].secName + "</td><td>" + (temp_iOAP.sections[i][1].length - 1) + "</td><td>" + temp_iOAP.secDetails[i].answered + "</td><td>" + temp_iOAP.secDetails[i].notanswered + "</td><td>" + temp_iOAP.secDetails[i].marked + "</td><td>" + (temp_iOAP.sections[i][1].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1) + "</td></tr>";
                    noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
                    noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
                    noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
                    totalQues = totalQues + temp_iOAP.sections[i][1].length - 1;
                    noOfNtAttemp = noOfNtAttemp + temp_iOAP.sections[i][1].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1;
                } else if (temp_iOAP.secDetails[i].isOptional == 'Y' && temp_iOAP.secDetails[i].isSelected) {
                    noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
                    noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
                    noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
                    totalQues = totalQues + temp_iOAP.sections[i][1].length - 1;
                    noOfNtAttemp = noOfNtAttemp + temp_iOAP.sections[i][1].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1;
                    str += "<tr><td>" + temp_iOAP.secDetails[i].secName + "</td><td>" + (temp_iOAP.sections[i][1].length - 1) + "</td><td>" + temp_iOAP.secDetails[i].answered + "</td><td>" + temp_iOAP.secDetails[i].notanswered + "</td><td>" + temp_iOAP.secDetails[i].marked + "</td><td>" + (temp_iOAP.sections[i][1].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1) + "</td></tr>";
                }
            }
            str += "</table>";
            $("#viewQPDiv").html(str);
            showModule('QPDiv');
            // alert("BMJ");
        }
    }
}


function fillSections() {
    fillGroups();
    var str = "<table width='100%'>";
    for (var i = 1; i < iOAP.secDetails.length ; i++) {
        var answeredQuestions = iOAP.secDetails[i].answered;
        var notAnsweredQuestions = iOAP.secDetails[i].notanswered;
        var markedQuestions = iOAP.secDetails[i].marked;
        var langId = 0;
        for (var k = 1; k < iOAP.languages.length; k++) {
            if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
                langId = k;
                break;
            }
        }
        var noOfQuestions = iOAP.sections[i][langId].length;
        var notAttemptedQuestions = noOfQuestions - markedQuestions - notAnsweredQuestions - answeredQuestions - 1;
        if (i%5 == 1) {
            str += "</td></tr>";
            str += "<tr><td>";
        }
        str += '<div class="allSections" id="s' + i + '" ><a href="#" class="tooltip">';
        str += '<div style="text-overflow:ellipsis;width:90%;overflow:hidden;white-space:nowrap;padding-left:10px;cursor:pointer">';
        if (iOAP.secDetails[i].isOptional == 'Y') {
            str += '<input name="optSec" id="opt' + i + '"';
            if (iOAP.secDetails[i].isSelected == true) {
                str += ' checked ';
            }
            if (mockVar.currentGrp != mockVar.MaxGrpEnabled && mockVar.groups[mockVar.currentGrp].isEditable == "N") {
                str += " disabled ";
            }
            str += 'type="checkbox"></input>';
        }
        str += iOAP.secDetails[i].secName + '</div>';
        str += '<span class="classic"><center><table width="95%" style="font-size:14px;margin-top:10px" class="question_area" cellspacing="0">';
        str += '<tr><td colspan="2"><b>' + iOAP.secDetails[i].secName + '</b></td></tr>';
        str += '<tr><td colspan="2"><hr/></td></tr></table>';
        str += '<table width="95%" style="margin-top:0%" class="question_area" cellspacing="5">';
        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.answered + ': </td><td valign="top"><span id="tooltip_answered">' + answeredQuestions + '</span></td></tr>';
        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.notAnswered + ': </td><td valign="top"><span  id="tooltip_not_answered">' + notAnsweredQuestions + '</span></td></tr>';
        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.markReview + ': </td><td valign="top"><span id="tooltip_review">' + markedQuestions + '</span></td></tr>';
        str += '<tr><td style="text-align:left;padding-top:10px" width="80%">' + mockLabels.notAttempted + ': </td><td valign="top"><span id="tooltip_not_visited">' + notAttemptedQuestions + '</span></td></tr>';
        str += '</table></center></span>';
        str += '</a></div>';
    }
    str += "</td></tr></table>";

    $('#sections').html(str);
    // align
    if ( iOAP.secDetails.length > 4 && ($.browser.msie) ) {
        for (var i = 4; i < iOAP.secDetails.length; i = i + 5) {
            $('#s' + (i + 1) + " .tooltip").hover(
                                                  function() {
                                                  $(this).find(".classic").css({
                                                                               "margin-left": "-60px"
                                                                               });
                                                  }, function() {
                                                  $(this).find(".classic").css({
                                                                               "margin-left": "-999px"
                                                                               });
                                                  });
        }
    }

    $("#s" + iOAP.curSection).addClass("currentSectionSelected");
    $("#s" + iOAP.curSection + " a").addClass("tooltipSelected");
    $("#sections .allSections input").click(function(event) {
                                            if (this.checked) {
                                            optSecCheck(this.id.split("opt")[1], event);
                                            } else {
                                            optSecUncheck(this.id.split("opt")[1], event);
                                            }
                                            });
    $("#sections .allSections").click(function (event) {
                                      if (event.target.type != "checkbox") {
                                      changeSection(this.id.split("s")[1]);
                                      }
                                      });
}

function optSecCheck(secId, event) {
    var counter = 0;
    for (var i = 1; i < iOAP.secDetails.length; i++) {
        if (iOAP.secDetails[i].isOptional == 'Y' && iOAP.secDetails[i].isSelected) {
            counter++;
        }
    }
    counter++;
    if (counter > iOAP.maxNoOptSec) {
        event.preventDefault();
        if (event.stopPropagation) {
            event.stopPropagation();
        } else
            event.returnValue = false;
        secChangeConfirmation();
    } else {
        iOAP.secDetails[secId].isSelected = true;
        enableOptButtons();
        changeSection(secId);
    }
}

function optSecUncheck(secId, event) {
    event.preventDefault();
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.returnValue = false;
    }
    var str = "";
    str = "<center><p style='margin-top:5%'><i>" + mockLabels.deselectOptSect + "</i></p><br/>";
    str += "<table align='center' style='margin-top:5%'>";
    str += '<tr><td style="text-align:center"><input onclick="resetSection(' + secId + ');afterResetSection();" type="button" class="button" value="' + mockLabels.reset + '"/></td><td  style="text-align:center"><input onclick="showModule(';
    str += "'questionCont'";
    str += ')" type="button" class="button" value="' + mockLabels.back + '"/></td></tr></table></center>';
    $("#sectionSummaryDiv").html(str);
    showModule('sectionSummaryDiv');
}

function resetSection(secId) {
    var counter = 0, langIdCount = 0;
    for (var langId = 1; langId < iOAP.languages.length; langId++) {
        if (iOAP.languages[langId] != null && typeof(iOAP.languages[langId]) != 'undefined') {
            langIdCount++;
            for (var j = 1; j < iOAP.sections[secId][langId].length; j++) {
                iOAP.sections[secId][langId][j].answer = '';
                iOAP.sections[secId][langId][j].typedWord = '';
                if (iOAP.viewLang[secId][j].status != 'notAttempted') {
                    iOAP.viewLang[secId][j].status = "notanswered";
                    counter++;
                }
            }
        }
    }
    $('#code').val('');
    $('#answer').val('');
    $("#noOfWords").text('');
    iOAP.secDetails[secId].answered = 0;
    // we are dividing here because the counter counts in all the languages.
    iOAP.secDetails[secId].notanswered = counter / (langIdCount);
    iOAP.secDetails[secId].marked = 0;
    iOAP.secDetails[secId].isSelected = false;
}

function afterResetSection() {
    showModule('questionCont');
    getQuestion();
    fillSections();
    enableOptButtons();
    fillNumberPanel();
}

function enableOptButtons() {
    $("#savenext").removeAttr("title");
    $("#underreview").removeAttr("title");
    $("#clearResponse").removeAttr("title");
    $("#compileCodeBtn").removeAttr("disabled");
    $("#saveProgram").removeAttr("disabled");
    $("#submitCodeBtn").removeAttr("disabled");
    $("#savenext").removeAttr("disabled");
    $("#underreview").removeAttr("disabled");
    $("#clearResponse").removeAttr("disabled");
    if (mockVar.currentGrp == mockVar.MaxGrpEnabled) {
        if (iOAP.secDetails[iOAP.curSection].isOptional == 'Y' && !iOAP.secDetails[iOAP.curSection].isSelected) {
            $("#savenext").attr("title", mockLabels.optSectTitle);
            $("#underreview").attr("title", mockLabels.optSectTitle);
            $("#clearResponse").attr("title", mockLabels.optSectTitle);
            $("#compileCodeBtn").attr("disabled", "disabled");
            $("#saveProgram").attr("disabled", "disabled");
            $("#savenext").attr("disabled", "disabled");
            $("#submitCodeBtn").attr("disabled", "disabled");
            $("#underreview").attr("disabled", "disabled");
            $("#clearResponse").attr("disabled", "disabled");
        }
    } else if (mockVar.groups[mockVar.currentGrp].isEditable == "N") {
        $("#savenext").attr("title", mockLabels.grpEditNotAllowedTitle);
        $("#underreview").attr("title", mockLabels.grpEditNotAllowedTitle);
        $("#clearResponse").attr("title", mockLabels.grpEditNotAllowedTitle);
        $("#compileCodeBtn").attr("disabled", "disabled");
        $("#saveProgram").attr("disabled", "disabled");
        $("#savenext").attr("disabled", "disabled");
        $("#submitCodeBtn").attr("disabled", "disabled");
        $("#underreview").attr("disabled", "disabled");
        $("#clearResponse").attr("disabled", "disabled");
        $('#answer').attr('disabled', 'disabled');
    }
    if ($("#savenext").attr('disabled') || $("#submitCodeBtn").attr('disabled')) {
        $("#savenext").removeClass('btnEnabled').addClass('btnDisabled');
        $("#submitCodeBtn").removeClass('btnEnabled').addClass('btnDisabled');
    } else {
        $("#savenext").removeClass('btnDisabled').addClass('btnEnabled');
        $("#submitCodeBtn").removeClass('btnDisabled').addClass('btnEnabled');
    }
}

function secChangeConfirmation() {
    var langId = 0, str = "";
    for (var k = 1; k < iOAP.languages.length; k++) {
        if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
            langId = k;
            break;
        }
    }
    str += "<center><p style='margin-top:5%;width:75%;text-align:left'><font color='red'>" + mockLabels.optSectResetMsg;
    str += "</p><center><b>" + mockLabels.optSectSummary + "</b></center>";
    str += "<table class='bordertable' cellspacing=0 width='60%' align='center' >";
    str += "<tr><th>" + mockLabels.optSectName + "</th><th>" + mockLabels.noOfQues + "</th><th>" + mockLabels.answered + "</th><th>" + mockLabels.notAnswered + "</th><th>" + mockLabels.markReview + "</th><th>" + mockLabels.notAttempted + "</th><th>" + mockLabels.reset + "</th></tr>";
    for (var i = 1; i < iOAP.secDetails.length; i++) {
        if (iOAP.secDetails[i].isOptional == 'Y') {
            if (iOAP.secDetails[i].isSelected) {
                str += "<tr><td>" + iOAP.secDetails[i].secName + "</td><td>" + (iOAP.sections[i][langId].length - 1) + "</td><td>" + iOAP.secDetails[i].answered + "</td><td>" + iOAP.secDetails[i].notanswered + "</td><td>" + iOAP.secDetails[i].marked + "</td><td>" + (iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1) + "</td><td><input type='checkbox' ";
                str += " value=" + i + " name='confSec'/></td></tr>";
            }
        }
    }
    str += "</table></center>";
    str += "<center><div align='center' style='margin-top:1%' ><span id='errorMsg'>&nbsp;</span></div>";
    str += '<div><span style="text-align:center"><input onclick="confirmChangeSec()" type="button" class="button" value="' + mockLabels.reset + '"/></span><span  style="text-align:center"><input onclick="showModule(';
    str += "'questionCont'";
    str += ')" type="button" class="button" value="' + mockLabels.back + '"/></span></div></center>';
    $("#sectionSummaryDiv").html(str);
    showModule('sectionSummaryDiv');
}

function finalSecChangeConf(secIds) {
    if ($.trim(secIds) != "") {
        var sections = secIds.split(",");
        for (var i = 0; i < sections.length - 1; i++) {
            resetSection(sections[i]);
        }
    }
    afterResetSection();
}

function confirmChangeSec() {
    var allCheckedSections = document.getElementsByName("confSec");
    var secIds = "";
    for (var i = 0; i < allCheckedSections.length; i++) {
        if (allCheckedSections[i].checked)
            secIds += allCheckedSections[i].value + ",";
    }
    var sections = secIds.split(',');
    if (sections.length > 1) {
        var str = "", innerHtml = "";
        str = "<center><table cellspacing=0 width='60%' align='center' style='margin-top:5%'>";
        str += "<tr><td colspan=2 style='text-align:center'>" + mockLabels.resetSect;
        for (var i = 0 ; i < sections.length - 1 ; i++) {
            // console.log(sections[i]);
            if (i > 0)
                innerHtml += " , ";
            innerHtml += iOAP.secDetails[sections[i]].secName;
        }
        str = str.substring(0, str.length - 2);
        str += "</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr>";
        str += '<tr><td style="text-align:right;margin-right:5px"><input onclick="finalSecChangeConf(';
        str += "'" + secIds + "'";
        str += ')" type="button" class="button" value="' + mockLabels.reset + '"/></td><td  style="text-align:left;margin-left:5px"><input onclick="showModule(';
        str += "'questionCont'";
        str += ')" type="button" class="button" value="' + mockLabels.back + '"/></td></tr></table></center>';
        $("#sectionSummaryDiv").html(str);
        $('#resetSections').html(innerHtml);
    } else {
        $('#errorMsg').html('<center><font style="color:red;font-weight:bold">' + mockLabels.selSectToReset + '</font></center>');
    }
}

function changeSection (sectionID) {
    saveQuestionAutomatically();
    if (sectionID != iOAP.curSection) {
        iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
        iOAP.curQues = iOAP.secDetails[sectionID].curQues;
        iOAP.curSection = sectionID;
    }
    enableOptButtons();
    getQuestion();
    changeQues(iOAP.curQues);
    numPanelSec();
    fillNumberPanel();
}

function fillNumberPanel() {
    var quesStatus;
    $('#underreview').show();
    $('#underreview').val(mockLabels.markForReviewNext);
    var str = '<center><table style="margin-top:-2%;" cellspacing="0" class="question_area " cellpadding="0" border="0" valign="top"><tr>';
    for (var i = 1; i < iOAP.viewLang[iOAP.curSection].length; i++) {
        if (i%4 == 1) {
            str += '</tr>';
            str += '<tr>';
        }
        quesStatus = iOAP.viewLang[iOAP.curSection][i].status ;
        if (quesStatus == "answered") {
            str += '<td id="qtd' + i + '"><span title ="' + mockLabels.answered + '" class="answered" id="' + i + '" onclick="javascript:changeQues(' + i + ');"> ' + i + '</span></td>';
        } else if (quesStatus == "notanswered") {
            str += '<td id="qtd' + i + '"><span title ="' + mockLabels.notAnswered + '" class="not_answered" id="' + i + '" onclick="javascript:changeQues(' + i + ');"> ' + i + '</span></td>';
        } else if (quesStatus == "marked") {
            if (iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][i].langID][i].answer == null || iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][i].langID][i].answer == '') {
                str += '<td id="qtd' + i + '"><span title ="' + mockLabels.markNotAnsTitle + '" class="review" id="' + i + '" onclick="javascript:changeQues(' + i + ');"> ' + i + '</span></td>';
            } else {
                str += '<td id="qtd' + i + '"><span title ="' + mockLabels.markAnsTitle + '" class="review_answered" id="' + i + '" onclick="javascript:changeQues(' + i + ');"> ' + i + '</span></td>';
            }
        } else {
            str += '<td id="qtd' + i + '"><span title ="' + mockLabels.notAttempted + '" class="not_visited" id="' + i + '" onclick="javascript:changeQues(' + i + ');"> ' + i + '</span></td>';
        }
    }
    str += '</tr></TBODY></table></center>';
    $('#numberpanelQues').html(str);
    var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues]
    if ((iOAP.viewLang[iOAP.curSection].length == 2 && mockVar.groups[mockVar.currentGrp].sections.length == 2) || ques.quesType == 'PROGRAMING') {
        if (iOAP.viewLang[iOAP.curSection].length == 2 && mockVar.groups[mockVar.currentGrp].sections.length == 2) {
            $('#underreview').val(mockLabels.markForReview);
            if (ques.quesType != 'SUBJECTIVE') {
                $('#savenext').val(mockLabels.save);
            }
        }
        if (ques.quesType == 'PROGRAMING') {
            $('#underreview').hide();
            $('#saveProgram').val(mockLabels.nextQ);
        }
    }
}

function changeQues(quesNo) {
    saveQuestionAutomatically();
    removeActiveLinks();
    iOAP.curQues = quesNo;
    showModule("questionCont");
    getQuestion();
    if ($('#typedAnswer')) {
        $('#typedAnswer').attr('disabled', true);
        $('#finalTypingSub').attr('disabled', true);
        $('#finalTypingSub').removeClass().addClass('typingTestButtonDisabled');
    }
    doCalculations(0, 0);
    fillNumberPanel();
}

function showModule(moduleName) {
    for (var i = 0; i < mockVar.modules.length; i++) {
        if (mockVar.modules[i] == moduleName) {
            $("#" + mockVar.modules[i]).show();
        } else {
            $("#" + mockVar.modules[i]).hide();
        }
    }
    focusOnDiv();
}

function numPanelSec() {
    $('#viewSection b').html(iOAP.secDetails[iOAP.curSection].secName);
}

function resetOption() {
    var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
    iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues].answer = '';
    if (ques.quesType == "SA" || ques.quesType == "COMPREHENSION@@SA" || ques.quesType == "LA@@SA" ) {
        $('#answer').val('');
        $("#noOfWords").text('');
    } else {
        var answers = document.getElementsByName('answers');
        for (var i = 0; i < answers.length; i++)
        {
            if (answers[i].checked == true)
                answers[i].checked = false;
        }
    }
    fnSubmit('RESET');
}

function saveQuestionAutomatically() {
    var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
    if ((ques.quesType == "SA" || ques.quesType == "COMPREHENSION@@SA" || ques.quesType == "LA@@SA") && ques.keyboardType == 2) {
        fnSubmit('saveSA');
    } else if (ques.quesType == "PROGRAMING") {
        fnSubmit('savePrograming');
    }
}

function submitConfirmation(param) {
    var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
    var noOfAns = 0, noOfNtAns = 0, noOfReview = 0, noOfNtAttemp = 0, totalQues = 0;
    var wrongCharCount = 0, ellapsedTime = 0;
    var str = "", timeOutStr = "", typingStr = "";
    var langId = 0;
    for (var k = 1; k < iOAP.languages.length; k++) {
        if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
            langId = k;
            break;
        }
    }
    saveQuestionAutomatically();
    str = "<div class='examSummaryHeader'><span class='header'>" + mockLabels.examSummary + "</span></div>";
    if (param == "break") {
        str += "<div id='break_summary' style='overflow:auto;text-align:center'>";
    } else if (param == 'submit') {
        str += "<div id='group_summary' style='overflow:auto;text-align:center'>";
    } else if (param == 'timeout') {
        timeOutStr = "<div class='examSummaryHeader'><span class='header'>" + mockLabels.examSummary + "</span></div>";
        timeOutStr += "<div id='group_summary' style='overflow:auto;text-align:center'>";
    }
    if (mockVar.groups.length == 1) {
        str += "<table class='bordertable' cellspacing=0 width='80%' align='center' style='margin-top:5%'>";
        if (iOAP.secDetails[1].secType == 'TYPING') {
            str += "<tr><th>" + mockLabels.secName + "</th><th>" + mockLabels.keyStrokesCount + "</th><th>" + mockLabels.backspaceCount + "</th><th>" + mockLabels.elapsedTime + "</th></tr>";
        } else {
            str += "<tr><th>" + mockLabels.secName + "</th><th>" + mockLabels.noOfQues + "</th><th>" + mockLabels.answered + "</th><th>" + mockLabels.notAnswered + "</th><th>" + mockLabels.markReview + "</th><th>" + mockLabels.notAttempted + "</th></tr>";
        }
        for (var i = 1; i < iOAP.secDetails.length; i++) {
            if (iOAP.secDetails[i].secType == 'TYPING') {
                wrongCharCount = (ques.typingType == 1) ? 0 : getWrongCharCount();
                ellapsedTime = mockVar.typingGroup[0].ellapsedTime;
                str += "<tr><td width='25%'>" + iOAP.secDetails[i].secName + "</td><td width='25%'>" + mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount + "</td><td width='25%'>" + mockVar.typingGroup[mockVar.currentGrp].backSpaceCount + "</td><td width='25%'>" + (ellapsedTime / 60).toFixed(2) + "</td></tr>";
                mockVar.typingGroup[0].wrongCharCount = wrongCharCount;
            } else {
                if (iOAP.secDetails[i].isOptional == 'N') {
                    str += "<tr><td width='25%'>" + iOAP.secDetails[i].secName + "</td><td width='15%'>" + (iOAP.sections[i][1].length - 1) + "</td><td width='15%'>" + iOAP.secDetails[i].answered + "</td><td width='15%'>" + iOAP.secDetails[i].notanswered + "</td><td width='15%'>" + iOAP.secDetails[i].marked + "</td><td width='15%'>" + (iOAP.sections[i][1].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1) + "</td></tr>";
                    noOfAns = noOfAns + iOAP.secDetails[i].answered;
                    noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
                    noOfReview = noOfReview + iOAP.secDetails[i].marked;
                    totalQues = totalQues + iOAP.sections[i][langId].length - 1;
                    noOfNtAttemp = noOfNtAttemp + iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1;
                } else if (iOAP.secDetails[i].isOptional == 'Y' && iOAP.secDetails[i].isSelected) {
                    noOfAns = noOfAns + iOAP.secDetails[i].answered;
                    noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
                    noOfReview = noOfReview + iOAP.secDetails[i].marked;
                    totalQues = totalQues + iOAP.sections[i][langId].length - 1;
                    noOfNtAttemp = noOfNtAttemp + iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1;
                    str += "<tr><td>" + iOAP.secDetails[i].secName + "</td><td>" + (iOAP.sections[i][langId].length - 1) + "</td><td>" + iOAP.secDetails[i].answered + "</td><td>" + iOAP.secDetails[i].notanswered + "</td><td>" + iOAP.secDetails[i].marked + "</td><td>" + (iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1) + "</td></tr>";
                }
            }
        }
        if (iOAP.secDetails.length > 2) {
            str += "<tr><td><b>Total</b></td><td><b>" + totalQues + "</b></td><td><b>" + noOfAns + "</b></td><td><b>" + noOfNtAns + "</b></td><td><b>" + noOfReview + "</b></td><td><b>" + noOfNtAttemp + "</b></td></tr>";
        }
        str += "</table></div>";
    } else {
        str += "<div style='margin-left:10%;text-align:left'><b>" + mockVar.groups[mockVar.currentGrp].groupName + "</b>" + mockLabels.curGrp + "</div>";
        str += "<table class='bordertable' cellspacing=0 width='80%' align='center'>";
        if (iOAP.secDetails[1].secType == 'TYPING') {
            str += "<tr><th>" + mockLabels.secName + "</th><th>" + mockLabels.keyStrokesCount + "</th><th>" + mockLabels.backspaceCount + "</th><th>" + mockLabels.elapsedTime + "</th></tr>";
        } else {
            str += "<tr><th>" + mockLabels.secName + "</th><th>" + mockLabels.noOfQues + "</th><th>" + mockLabels.answered + "</th><th>" + mockLabels.notAnswered + "</th><th>" + mockLabels.markReview + "</th><th>" + mockLabels.notAttempted + "</th></tr>";
        }
        for (var i = 1; i < iOAP.secDetails.length; i++) {
            if (iOAP.secDetails[i].secType == 'TYPING') {
                wrongCharCount = (ques.typingType == 1) ? 0 : getWrongCharCount();
                ellapsedTime = mockVar.typingGroup[mockVar.currentGrp].ellapsedTime;
                str += "<tr><td width='25%'>" + iOAP.secDetails[i].secName + "</td><td width='25%'>" + mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount + "</td><td width='25%'>" + mockVar.typingGroup[mockVar.currentGrp].backSpaceCount + "</td><td width='25%'>" + (ellapsedTime / 60).toFixed(2) + "</td></tr>";
                mockVar.typingGroup[mockVar.currentGrp].wrongCharCount = wrongCharCount;
            } else {
                if (iOAP.secDetails[i].isOptional == 'N') {
                    str += "<tr><td width='25%'>" + iOAP.secDetails[i].secName + "</td><td width='15%'>" + (iOAP.sections[i][langId].length - 1) + "</td><td width='15%'>" + iOAP.secDetails[i].answered + "</td><td width='15%'>" + iOAP.secDetails[i].notanswered + "</td><td width='15%'>" + iOAP.secDetails[i].marked + "</td><td width='15%'>" + (iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1) + "</td></tr>";
                    noOfAns = noOfAns + iOAP.secDetails[i].answered;
                    noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
                    noOfReview = noOfReview + iOAP.secDetails[i].marked;
                    totalQues = totalQues + iOAP.sections[i][langId].length - 1;
                    noOfNtAttemp = noOfNtAttemp + iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1;
                } else if (iOAP.secDetails[i].isOptional == 'Y' && iOAP.secDetails[i].isSelected) {
                    noOfAns = noOfAns + iOAP.secDetails[i].answered;
                    noOfNtAns = noOfNtAns + iOAP.secDetails[i].notanswered;
                    noOfReview = noOfReview + iOAP.secDetails[i].marked;
                    totalQues = totalQues + iOAP.sections[i][langId].length - 1;
                    noOfNtAttemp = noOfNtAttemp + iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1;
                    str += "<tr><td width='25%'>" + iOAP.secDetails[i].secName + "</td><td width='15%'>" + (iOAP.sections[i][langId].length - 1) + "</td><td width='15%'>" + iOAP.secDetails[i].answered + "</td><td width='15%'>" + iOAP.secDetails[i].notanswered + "</td><td width='15%'>" + iOAP.secDetails[i].marked + "</td><td width='15%'>" + (iOAP.sections[i][langId].length - iOAP.secDetails[i].answered - iOAP.secDetails[i].notanswered - iOAP.secDetails[i].marked - 1) + "</td></tr>";
                }
            }
        }
        str += "</table>";
        for (var j = 0; j < mockVar.groups.length; j++) {
            var temp_iOAP = mockVar.groups[j];
            if (mockVar.currentGrp > j || param == "timeout") {
                if (temp_iOAP.secDetails[1].secType == 'TYPING') {
                    typingStr += "<br/><div style='margin-left:10%;text-align:left''><b>" + mockVar.groups[j].groupName + "</b> :</div>";
                    typingStr += "<table class='bordertable' cellspacing=0 width='80%' align='center'>";
                    typingStr += "<tr><th>" + mockLabels.secName + "</th><th>" + mockLabels.keyStrokesCount + "</th><th>" + mockLabels.backspaceCount + "</th><th>" + mockLabels.elapsedTime + "</th></tr>";
                } else {
                    if (param == "timeout") {
                        timeOutStr += "<br/><div style='margin-left:10%;text-align:left'><b>" + mockVar.groups[j].groupName + "</b> :</div>";
                    } else {
                        timeOutStr += "<br/><div style='margin-left:10%;text-align:left'><b>" + mockVar.groups[j].groupName + "</b> : ( " + mockLabels.attemptedGrp;
                        if (mockVar.groups[j].isViewable == "Y") {
                            timeOutStr += mockLabels.canView;
                        } else {
                            timeOutStr += mockLabels.canNotView;
                        }
                        if (mockVar.groups[j].isEditable == "Y") {
                            timeOutStr += mockLabels.canEdit;
                        } else {
                            timeOutStr += mockLabels.canNotEdit;
                        }
                        timeOutStr += ")</div>";
                    }
                    timeOutStr += "<table class='bordertable' cellspacing=0 width='80%' align='center'>";
                    timeOutStr += "<tr><th>" + mockLabels.secName + "</th><th>" + mockLabels.noOfQues + "</th><th>" + mockLabels.answered + "</th><th>" + mockLabels.notAnswered + "</th><th>" + mockLabels.markReview + "</th><th>" + mockLabels.notAttempted + "</th></tr>";
                }
                for (var i = 1; i < temp_iOAP.secDetails.length; i++) {

                    if (temp_iOAP.secDetails[i].secType == 'TYPING') {
                        typingStr += "<tr><td width='25%'>" + temp_iOAP.secDetails[i].secName + "</td><td width='25%'>" + mockVar.typingGroup[j].keyStrokesCount + "</td><td width='25%'>" + mockVar.typingGroup[j].backSpaceCount + "</td><td width='25%'>" + (mockVar.typingGroup[j].ellapsedTime / 60).toFixed(2) + "</td></tr>";
                    } else {
                        if (temp_iOAP.secDetails[i].isOptional == 'N') {
                            timeOutStr += "<tr><td width='25%'>" + temp_iOAP.secDetails[i].secName + "</td><td width='15%'>" + (temp_iOAP.sections[i][langId].length - 1) + "</td><td width='15%'>" + temp_iOAP.secDetails[i].answered + "</td><td width='15%'>" + temp_iOAP.secDetails[i].notanswered + "</td><td width='15%'>" + temp_iOAP.secDetails[i].marked + "</td><td width='15%'>" + (temp_iOAP.sections[i][langId].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1) + "</td></tr>";
                            noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
                            noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
                            noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
                            totalQues = totalQues + temp_iOAP.sections[i][langId].length - 1;
                            noOfNtAttemp = noOfNtAttemp + temp_iOAP.sections[i][langId].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1;
                        } else if (temp_iOAP.secDetails[i].isOptional == 'Y' && temp_iOAP.secDetails[i].isSelected) {
                            noOfAns = noOfAns + temp_iOAP.secDetails[i].answered;
                            noOfNtAns = noOfNtAns + temp_iOAP.secDetails[i].notanswered;
                            noOfReview = noOfReview + temp_iOAP.secDetails[i].marked;
                            totalQues = totalQues + temp_iOAP.sections[i][langId].length - 1;
                            noOfNtAttemp = noOfNtAttemp + temp_iOAP.sections[i][langId].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1;
                            timeOutStr += "<tr><td width='25%'>" + temp_iOAP.secDetails[i].secName + "</td><td width='15%'>" + (temp_iOAP.sections[i][langId].length - 1) + "</td><td width='15%'>" + temp_iOAP.secDetails[i].answered + "</td><td width='15%'>" + temp_iOAP.secDetails[i].notanswered + "</td><td width='15%'>" + temp_iOAP.secDetails[i].marked + "</td><td width='15%'>" + (temp_iOAP.sections[i][langId].length - temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].notanswered - temp_iOAP.secDetails[i].marked - 1) + "</td></tr>";
                        }
                    }
                }
                typingStr += "</table>";
                timeOutStr += "</table>";
            } else if (mockVar.currentGrp < j) {
                timeOutStr += "<br/><div style='margin-left:10%;text-align:left'><b>" + mockVar.groups[j].groupName + "</b>" + mockLabels.yetToAttempt + "</div>";
            }
        }
        /*
         * if(iOAP.secDetails.length>2){ str +="<tr><td><b>Total</b></td><td><b>"+totalQues+"</b></td><td><b>"+noOfAns+"</b></td><td><b>"+noOfNtAns+"</b></td><td><b>"+noOfReview+"</b></td><td><b>"+noOfNtAttemp+"</b></td></tr>"; }
         */
        timeOutStr += typingStr;
        timeOutStr += "</div>";
        str += timeOutStr;
    }
    if (param == 'submit') {

        str += "<div id='confirmation_buttons' class='buttonDiv'><table align='center'><tr><td colspan='2'>";
        if (mockVar.groups.length <= 1)
            str += mockLabels.submitExam;
        else
            str += mockLabels.submitGrp;
        str += ' ?</td></tr><tr><td style="text-align:center"><input onclick="finalSubmit(';
        str += "'group'";
        str += ')" type="button" class="button" style="width:50px" value="' + mockLabels.yes + '"/></td><td  style="text-align:center"><input onclick="showModule(';
        str += "'questionCont'";
        str += ');doCalculations(0,0);removeActiveLinks();" type="button" class="button" style="width:50px" value="' + mockLabels.no + '"/></td></tr></table><div>';
    } else if (param == 'timeout') {
        timeOutStr += "<div id='timeoutSummaryNextBtnDiv' class='buttonDiv'><input onclick='submitMock()' type='button' class='button' value='Next'/></div>";
        return timeOutStr;
    } else if (param == 'break') {
        $('#questionContent').hide();
        $("#breakSummaryDiv").html(str);
        $('#breakTimeDiv').show();
        $('#breakContentDiv').height($('#breakTimeDiv').height() - $('#brkPrcdBtnDiv').outerHeight(true));
        $('#breakSummaryDiv').height($('#breakContentDiv').height() - $('#breakTimeCountDiv').outerHeight(true));
        $('#break_summary').height($('#breakSummaryDiv').height() - $('.examSummaryHeader').outerHeight(true));
    }
    $("#sectionSummaryDiv").html(str);
    $('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
    showModule('sectionSummaryDiv');
    $('#group_summary').height($('#sectionSummaryDiv').height() - $('#confirmation_buttons').outerHeight(true) - $('.examSummaryHeader').outerHeight(true) - 5);
    //$("#group_summary").css({"height":($(document).height()*.40)+"px"});
}

function submitMock() {
    mockScoreCalc();
    if (mockVar.storeCandResponse == 1) {
        saveCandResponse();
    } else {
        moveToScoreCardDisplay();
    }
}

function moveToScoreCardDisplay() {
    if (mockVar.displayScoreCard == 1) {
        showScoreCard();
    } else {
        moveToFeedback();
    }
}

function moveToFeedback() {
    setCookie(mockVar.langName);
    document.cookie = "sessionid = 'abcd'; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"
    if (mockVar.isFeedBackRequired == "NO") {
        window.location.href = "close.html?" + mockVar.orgId + "@@" + mockVar.mockId + "#";
    } else {
        window.location.href = "FeedBack.html?" + mockVar.orgId + "@@" + mockVar.mockId + "#";
    }
}

function finalSubmit(type) {
    var str = "<center><table style='margin-top:5%'><tr><td colspan='2'>";
    if (mockVar.groups.length <= 1)
        str += mockLabels.submitExam;
    else
        str += mockLabels.submitGrp;
    str += ' ?</td></tr><tr><td style="text-align:center"><input onclick="';
    if (type == "submit") {
        str += 'fnSubmit(';
        str += "'SUBMIT'";
        str += ')"';
    } else {
        str += "checkGroupBreakTime();removeActiveLinks();";
    }
    str += '" type="button" class="button" value="' + mockLabels.yes + '" style="width:50px"/></td><td  style="text-align:center"><input onclick="showModule(';
    str += "'questionCont'";
    str += ');doCalculations(0,0);removeActiveLinks();" type="button" class="button" value="' + mockLabels.no + '" style="width:50px"/></td></tr></table></center>';
    $("#sectionSummaryDiv").html(str);
    $('#curGrpName').html(mockVar.groups[mockVar.currentGrp].groupName);
}

function fnSubmit(action) {
    var ques = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
    var selectedAnswer = "";
    var wordCountForSA = "";
    var proceed = true;
    var section = iOAP.secDetails[iOAP.curSection];
    var quesToBeConsidered = parseInt(section.answered);
    if (action != "SKIP") {
        if (ques.quesType == "SA" || ques.quesType == "COMPREHENSION@@SA" || ques.quesType == "LA@@SA") {
            selectedAnswer = document.getElementById('answer').value;
            wordCountForSA = $("#noOfWords").text();
        } else if (ques.quesType == "TYPING") {
            selectedAnswer = document.getElementById('typedAnswer').value;
        } else if (ques.quesType == "PROGRAMING") {
            selectedAnswer = editor.getValue();
            if (selectedAnswer != ques.answer) {
                ques.programingStatus = 'saveProgram';
            }
        } else if (ques.quesType != "SUBJECTIVE") {
            var answers = document.getElementsByName('answers');
            for (var i = 0; i < answers.length; i++)
            {
                if (answers[i].checked == true)
                {
                    selectedAnswer = (answers[i].value) + "," + selectedAnswer;
                }
            }
            if (selectedAnswer != "")
                selectedAnswer = selectedAnswer.substring(0, selectedAnswer.length - 1);
        }
    }
    if (section.maxOptQuesToAns != "") {
        if (mockVar.isMarkedForReviewConsidered == "YES") {
            var counter = 0;
            for (i = 1; i < iOAP.viewLang[iOAP.curSection].length; i++) {
                var quesStatus = iOAP.viewLang[iOAP.curSection][i].status ;
                if (quesStatus == "marked" && !(iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][i].langID][i].answer == null
                                                || iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][i].langID][i].answer == '')) {
                    counter++;
                }
            }
            quesToBeConsidered += counter;
        }
        var curQuesStatus = iOAP.viewLang[iOAP.curSection][iOAP.curQues].status;
        if (!(action == "SKIP" || action == "RESET" || action == "SUBMIT") &&
            !(curQuesStatus == "answered" || (curQuesStatus == "marked" &&
                                              iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues].answer != ""))) {
            if (quesToBeConsidered == section.maxOptQuesToAns && selectedAnswer != "" ) {
                proceed = false;
            }
        }
    }
    if (proceed) {
        for (i = 1; i < iOAP.languages.length; i++) {
            if (iOAP.languages[i] != null && typeof(iOAP.languages[i]) != 'undefined') {
                iOAP.sections[iOAP.curSection][i][iOAP.curQues].answer = selectedAnswer;
                iOAP.sections[iOAP.curSection][i][iOAP.curQues].typedWord = wordCountForSA;
            }
        }
        if (action != 'SUBMIT') {
            save(selectedAnswer, action, ques.quesType);
        } else {
            submitMock();
        }
    }
}

function fillMaxOptQuesCrossed(quesToBeConsidered, totalQuestions) {
    var str = "", alertMsg = "";
    if (mockVar.isMarkedForReviewConsidered == "YES") {
        alertMsg = mockLabels.maxQuesCrossedWithMarkReview;
    } else {
        alertMsg = mockLabels.maxQuesCrossedWithoutMarkReview;
    }
    str = '<div id="warningMsgDiv" style="background-color:#F5F6CE; border:1px solid #FE9A2E; padding: 1%; margin: 1%; font-size: 12px">';
    str += '<table><tr><td style="vertical-align:middle"><img src="images/warning-icon.png" /></td>';
    str += '<td style="text-align: justify;"><div style="margin-left:10px"><b>Note : </b>';
    str += alertMsg.replace('@@quesToBeConsidered@@', quesToBeConsidered).replace('@@totalQuestions@@', totalQuestions);
    str += '</div></td></tr></table></div>';
    $('#warningMsgDiv').remove();
    $("#quesAnsContent").prepend(str);
    $('.answer').attr('disabled', 'disabled');
    $('#vKeyboard').remove();
}

function save(ansID, action, quesType) {
    var quesStatus = iOAP.viewLang[iOAP.curSection][iOAP.curQues].status;
    if (ansID == "" && quesType != "SUBJECTIVE")
        ansID = null;
    if (action == "MARK") {
        if (quesStatus == "answered") {
            iOAP.secDetails[iOAP.curSection].answered--;
        } else if (quesStatus == "notanswered") {
            iOAP.secDetails[iOAP.curSection].notanswered--;
        }
        if (quesStatus != "marked") {
            iOAP.secDetails[iOAP.curSection].marked++;
        }
        iOAP.viewLang[iOAP.curSection][iOAP.curQues].status = "marked";
    } else if (action == "RESET") {
        if (quesStatus == "marked") {
            iOAP.secDetails[iOAP.curSection].marked--;
            iOAP.secDetails[iOAP.curSection].notanswered++;
        } else if (quesStatus == "answered") {
            iOAP.secDetails[iOAP.curSection].answered--;
            iOAP.secDetails[iOAP.curSection].notanswered++;
        }
        iOAP.viewLang[iOAP.curSection][iOAP.curQues].status = "notanswered";
    } else if ((action == "NEXT" && quesType != "PROGRAMING") || action == "saveSA" || action == "submitPrograming") {
        if (ansID == null) {
            if (quesStatus == "answered") {
                iOAP.secDetails[iOAP.curSection].notanswered++;
                iOAP.secDetails[iOAP.curSection].answered--;
            } else if (quesStatus == "marked") {
                iOAP.secDetails[iOAP.curSection].notanswered++;
                iOAP.secDetails[iOAP.curSection].marked--;
            }
            iOAP.viewLang[iOAP.curSection][iOAP.curQues].status = "notanswered";
        } else {
            if (quesStatus != "answered") {
                if (quesStatus == "marked")
                    iOAP.secDetails[iOAP.curSection].marked--;
                if (quesStatus == "notanswered")
                    iOAP.secDetails[iOAP.curSection].notanswered--;
                iOAP.secDetails[iOAP.curSection].answered++;
            }
            iOAP.viewLang[iOAP.curSection][iOAP.curQues].status = "answered";
        }
    }

    if (action == "NEXT" || action == "MARK" || action == "SKIP") {
        var secQuesLength = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID].length ;
        if (iOAP.curQues < secQuesLength - 1) {
            iOAP.curQues = iOAP.curQues + 1;
            iOAP.secDetails[iOAP.curSection].curQues = iOAP.curQues;
            getQuestion();
            numPanelSec();
            fillNumberPanel();
        } else {
            if (iOAP.curSection == iOAP.sections.length - 1) {
                iOAP.curSection = 1;
            } else {
                iOAP.curSection++;
            }
            iOAP.curQues = 1;
            getQuestion();
            numPanelSec();
            fillNumberPanel();
        }
    } else {
        getQuestion();
        numPanelSec();
        fillNumberPanel();
    }
}

function bConfirm() {
    $('#pWait').css({
                    "background": "none",
                    "opacity": "1",
                    "width": "99%",
                    "height": "98%"
                    });
    var str = '<div style="top:40%;left:30%;width:400px;position:relative;background:white;border:2px solid #000"><h1 id="popup_title" class="confirm"></h1>';
    str += '<div id="popup_content" class="confirm">' +
    '<div id="popup_message">You have reached the last question of the exam.Do you want to go to the first question again?</div>' +
    '<div id="popup_panel">' +
    '<input type="image" id="popup_ok" value="&nbsp;OK&nbsp;" onclick="bConfirmOK()" src="images/ok_new.gif">' +
    '<input type="image" id="popup_cancel" value="&nbsp;Cancel&nbsp;" onclick="bConfirmCancel()" src="images/cancel_new.gif">' +
    '</div>' +
    '</div></div>';
    $('#pWait').html(str);
    $('#pWait').show();
}

function bConfirmOK() {
    iOAP.curSection = 1;
    iOAP.curQues = 1;
    getQuestion();
    numPanelSec();
    fillNumberPanel();
    $("#pWait").hide();
}

function bConfirmCancel() {
    getQuestion();
    numPanelSec();
    fillNumberPanel();
    $("#pWait").hide();
}

function timer() {
    if (iOAP.secWiseTimer == 0) {
        startCounter(mockVar.time);
    }
}

function startCounter(time) {
    $("#showTime").html( "<b>" + mockLabels.timeLeft + "<span id='timeInMins'>" + convertTime(time) + "</span></b>");
    if (mockVar.groups[mockVar.currentGrp].maxTime > 0) {
        if (mockVar.groups[mockVar.currentGrp].maxTime - time >= mockVar.minSubmitTime && mockVar.currentGrp == mockVar.MaxGrpEnabled) {
            $("#finalSub").removeAttr("disabled");
        } else {
            $("#finalSub").attr("disabled", "true");
        }
    } else {
        if (mockVar.nonTimeBoundTime - time >= mockVar.minSubmitTime && mockVar.currentGrp == mockVar.MaxGrpEnabled) {
            $("#finalSub").removeAttr("disabled");
        } else {
            $("#finalSub").attr("disabled", "true");
        }
    }
    mockVar.time = time - 1;
    if (time <= 300) {
        $('#timeInMins').css('color', 'red');
    }
    if (time > 0) {
        mockVar.timeCounter = setTimeout(function() {
                                         startCounter(time - 1);
                                         }, 1000);
        mockVar.timeLeft = mockVar.time - mockVar.timeCounter;
        window.name = JSON.stringify(mockVar);
    } else {
        mockVar.typingGroup[mockVar.currentGrp].ellapsedTime = mockVar.groups[mockVar.currentGrp].maxTime; // required
        // for
        // typing
        // group
        if (mockVar.currentGrp < mockVar.groups.length - 1 ) {
            checkGroupBreakTime();
            // changeGroup(mockVar.currentGrp);
        } else {
            // window.location.href="FeedBack.html";
            timeOutSubmit();
        }
    }
}

function breakTimeCounter(time) {
    $("#breakTimeCounter").html( "<b>" + mockLabels.breakTimeLeft + convertTime(time) + "</b>");
    if (time > 0) {
        mockVar.timeCounter = setTimeout(function() {
                                         breakTimeCounter(time - 1);
                                         }, 1000);
    } else {
        submitGroup();
    }
}

function timeOutSubmit() {
    var str = submitConfirmation('timeout');
    $("#pWait").hide();
    /*$("#sectionSummaryDiv").css({"height":"80%","border":"1px #fff solid"});
    	$("#groups").html('');
    	$('#groups').css({"border":"1px #fff solid"});
    	$('#sectionsField').html('');
    	$('#sectionsField').css({"border":"1px #fff solid"});
    	// $('#assessmentname').html('');
    	$('#timer').html('');
    	$('.numberpanel').html('');*/
    $("#groups").hide();
    $("#sectionsField").hide();
    $("#timer").hide();
    $('#mainleft').html(str);
    $('.numberpanel').css({
                          "background": "#fff",
                          "border-left": "1px #000 solid",
                          "height": "100%"
                          });
    $('#group_summary').height($('#mainleft').height() - $('#timeoutSummaryNextBtnDiv').outerHeight(true) - $('.examSummaryHeader').outerHeight(true));
    $('.numberpanel').html('<div style="top:25%;position:relative"><center><img src="/static/quiz/images/NewCandidateImage.jpg" width="50%" /> </center></div>');
    alert(mockLabels.timeOutSubmitMsg);
}

function convertTime(time) {
    return showMin(time) + ":" + showSec(time);
}


function showMin(time) {
    var min = 0;
    // time = time%3600;
    min = parseInt(time / 60);
    return min;
}

function showSec(time) {
    var sec = "";
    if ((time%60) > 9)
        sec = time%60;
    else
        sec = "0" + time%60;
    return sec;
}


/*
 * Time in hours function convertTime(time){ return
 * showHr(time)+":"+showMin(time)+":"+showSec(time); }
 *
 * function showHr(time){ return "0"+parseInt(time/3600); }
 *
 * function showMin(time){ var min = ""; time = time%3600; if((time/60)>9) min =
 * parseInt(time/60); else min = "0"+parseInt(time/60); return min; }
 *
 * function showSec(time){ var sec=""; if((time%60)>9) sec = time%60; else sec =
 * "0"+time%60; return sec; }
 */
function imgMagnifyInc( img, percentage) {
    var width = img.width;
    var height = img.height;
    height = height + height * percentage / 100;
    width = width + width * percentage / 100;
    var zindex = 1;
    if (percentage > 0)
        zindex = 999;
    $(img).css({
               "height": height,
               "width": width,
               "z-index": zindex,
               "position": "relative"
               });
}

function showQP() {
    var i, j;
    var str = "";
    var noOfQues = new Array();
    var quesCounter = 0;
    var counter = 0;
    var addQuesGroupCounter = false;
    for (i = 1; i < iOAP.viewLang.length; i++) {
        for (j = 1; j < iOAP.viewLang[i].length; j++) {
            ques = iOAP.sections[i][iOAP.viewLang[i][j].langID][j];
            if (ques.quesType.indexOf("@@") !=-1 ) {
                if (ques.isParent) {
                    if (!addQuesGroupCounter) {
                        addQuesGroupCounter = true;
                    } else {
                        noOfQues[quesCounter] = counter;
                        quesCounter++;
                    }
                    counter = 1;
                } else {
                    counter++;
                }
            } else {
                if (counter > 1) {
                    noOfQues[quesCounter] = counter;
                    quesCounter++;
                }
                counter = 1;
            }
        }
    }
    quesCounter = 0;
    if (mockVar.groups.length > 1) {
        str += str += "<h2><font color='#2F72B7'> " + mockVar.groups[mockVar.currentGrp].groupName + "</font></h2>" ;
    }
    for (i = 1; i < iOAP.viewLang.length; i++) {
        str += "<h2><font color='#2F72B7'>Section : " + iOAP.secDetails[i].secName + "</font></h2>" ;
        for (j = 1; j < iOAP.viewLang[i].length; j++) {
            ques = iOAP.sections[i][iOAP.viewLang[i][j].langID][j];
            if (ques.quesType.indexOf("@@") !=-1 ) {
                str += "<p style='padding-left:5px'>";
                if (ques.isParent) {
                    if (ques.quesType.split("@@")[0] == "COMPREHENSION" ) {
                        str += "<b>" + mockVar.compQName ;
                    } else if (ques.quesType.split("@@")[0] == "LA") {
                        str += "<b>" + mockVar.laQName ;
                    }
                    str += "(Question Number " + j + " to " + (j + noOfQues[quesCounter] - 1) + ") :</b> <br/> " + ques.quesText.split("@@&&")[0] + "<br/>";
                    quesCounter++;
                }
                str += "<table><tr><td valign='top' width='50px'>Q. " + j + ") </td><td>" + ques.quesText.split("@@&&")[1] + "</td>";
            } else {
                str += "<p style='padding-left:5px'><table><tr><td>Q. " + j + ") </td><td>" + ques.quesText + "</td></tr>";
            }
            str += "<tr><td width='50px'></td><td><i style='font-size:1em;'>";
            if (ques.quesType.indexOf("MCQ")>-1 && mockVar.mcQName.length > 0) {
                str += mockLabels.questionType + "<b>";
                str += mockVar.mcQName;
                str += "</b>;";
            } else if (ques.quesType.indexOf("MSQ")>-1 && mockVar.msQName.length > 0) {
                str += mockLabels.questionType + "<b>";
                str += mockVar.msQName;
                str += "</b>;";
            } else if (ques.quesType.indexOf("SA")>-1 && mockVar.saQName.length > 0) {
                str += mockLabels.questionType + "<b>";
                str += mockVar.saQName;
                str += "</b>;";
            } else if (ques.quesType.indexOf("SUBJECTIVE")>-1 && mockVar.subjQName.length > 0) {
                str += mockLabels.questionType + "<b>";
                str += mockVar.subjQName;
                str += "</b>;";
            }
            if (mockVar.showMarks) {
                str += mockLabels.correctAnswerMarks + " <font color='green'><b> " + ques.allottedMarks + "</b></font>";
                str += "; " + mockLabels.negativeMarks + " </span><font color='red'><b> " + ques.negMarks + "</b></font>";
            }
            str += "</i><td></tr>";
            str += "</table></p><hr style='color:#ccc'/>";
        }
        str += "<br/>";
    }
    $("#viewQPDiv").html(str);
    showModule('QPDiv');
}

function multiLangInstru() {
    $("#basInst option[value='instEnglish']").attr("selected", "selected");
    if (document.getElementById("multiLangDD") != null) {
        $("#multiLangDD option").each(function() {
                                      if ($(this).text().toUpperCase() == 'HINDI') {
                                      $('#basInst').parent().show();
                                      }
                                      });
        $("#multiLangDD").change(function () {
                                 var select = this.value;
                                 $("#multiLangDD option").each(function() {

                                                               if (select == this.value) {
                                                               $("#instLang" + select).show();
                                                               } else {
                                                               $("#instLang" + this.value).hide();
                                                               }
                                                               });
                                 });
    }
}


/** *************************************FeedBack page ******************** */

function validateFeedPageURL() {
    var url = document.URL;
    var params = url.split("FeedBack.html?");
    var orgId = $.trim(params[1]).split("@@")[0];
    var mockId = $.trim(params[1]).split("@@")[1];
    if (params.length > 1 ) {
        if (mockId.indexOf("#")>-1) {
            mockId = mockId.substring(0, mockId.indexOf("#"));
        }
        if ($.trim(params[1]).length > 0) {
            validateExpiry(orgId, mockId);
            var xml = readAndReturnXML(orgId + '/' + mockId + '/confDetails.xml');
            basicDetails(xml);
            feedbackPageLabel();
            $("#pWait").hide();
        }
    } else {
        window.location.href = "error11.html";
    }
}


/** *************************************close page ******************** */
function validateClosePageURL() {
    var url = document.URL;
    var params = url.split("close.html?");
    var orgId = $.trim(params[1]).split("@@")[0];
    var mockId = $.trim(params[1]).split("@@")[1];
    if (params.length > 1 ) {
        if (mockId.indexOf("#")>-1) {
            mockId = mockId.substring(0, mockId.indexOf("#"));
        }
        if ($.trim(params[1]).length > 0) {
            validateExpiry(orgId, mockId);
            var xml = readAndReturnXML(orgId + '/' + mockId + '/confDetails.xml');
            basicDetails(xml);
            loadClosePageLabel();
            $("#pWait").hide();
        }
    } else {
        window.location.href = "error12.html";
    }
}

function activeLink(linkId) {
    for (var i = 0; i < mockVar.activeLinkList.length; i++) {
        if (mockVar.activeLinkList[i] == linkId) {
            $("#" + mockVar.activeLinkList[i]).css("background", "#2F72B7");
            $("#" + mockVar.activeLinkList[i]).css("color", "white");
        } else {
            $("#" + mockVar.activeLinkList[i]).removeAttr('style');
        }
    }
}

function removeActiveLinks() {
    for (var i = 0; i < mockVar.activeLinkList.length; i++) {
        $("#" + mockVar.activeLinkList[i]).removeAttr('style');
    }
}

function calcTotalQues(orgId, mockId) {
    var quesCount = 0;
    var langArr = new Array();
    var QPxml = readAndReturnXML(orgId + '/' + mockId + '/quiz.xml');
    $(QPxml).find('LANGID').each(function() {
                                 if ($.inArray($(this).text(), langArr)==-1) {
                                 langArr.push($(this).text());
                                 }
                                 })
    $(QPxml).find('QUESTION').each(function() {
                                   quesCount++;
                                   });
    $(".totalNoOfQues").html(quesCount / langArr.length);
}

function loadCalculator() {
    $('#loadCalc').show();
    $('#loadCalc').load('Calculator.html', function() {
                        $('#closeButton').click(function() {
                                                $('#loadCalc').hide();
                                                });
                        });
}

function disableTab(event) {
    $("textarea").keydown(function(e) {
                          var key_code = (window.event) ? event.keyCode : e.which;
                          if (key_code == 9) {
                          e.preventDefault();
                          }
                          });
}

function allowSAInputsForMultiLang(event) {
    var key_code = (window.event) ? event.keyCode : event.which;
    if (key_code == 27 || key_code == 17 || key_code == 19 || key_code == 9 || (key_code >= 91 && key_code <= 93) || (key_code >= 33 && key_code <= 36) || key_code == 38 || key_code == 40 || key_code == 45 || (key_code >= 112 && key_code <= 123) || key_code == 145) {
        return false;
    } else {
        return true;
    }
}

function validateKeyBoardInputAlphaNumeric(evt, textAreaObj) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!(evt.ctrlKey || evt.altKey) && ((charCode >= 97 && charCode <= 122)
                                         || (charCode >= 65 && charCode <= 90) || (charCode >= 48 && charCode <= 57)
                                         || (charCode == 43) || (charCode == 44) || (charCode == 45) || (charCode == 46) || (charCode == 32)
                                         || (charCode == 59) || (charCode == 42) || (charCode == 13) || (charCode == 33) || (charCode == 64)
                                         || (charCode == 35) || (charCode == 36) || (charCode == 37) || (charCode == 94) || (charCode == 38)
                                         || (charCode == 42) || (charCode == 40) || (charCode == 41) || (charCode == 95) || (charCode == 61)
                                         || (charCode == 20) || (charCode == 123) || (charCode == 125) || (charCode == 91) || (charCode == 93)
                                         || (charCode == 124) || (charCode == 92) || (charCode == 126) || (charCode == 96)
                                         || (charCode == 58) || (charCode == 34) || (charCode == 39) || (charCode == 60) || (charCode == 62)
                                         || (charCode == 63) || (charCode == 47) || (charCode == 106) || (charCode == 111) || (charCode == 12)
                                         || (charCode == 8) || (charCode == 190) || (charCode == 191) || (charCode == 188) || (charCode == 222))) {
        return true;
    } else {
        return false;
    }
}

function word_count() {
    var number = 0;
    var matches = $("#answer").val().match(/\S+/g);
    if (matches) {
        number = matches.length;
    }
    $("#noOfWords").text(number + ' word' + (number > 1 ? 's' : '') + ' typed');
}

function calculateEllapsedTime() {
    var ellapsedTime = mockVar.groups[mockVar.currentGrp].maxTime - mockVar.time;
    mockVar.typingGroup[mockVar.currentGrp].ellapsedTime = ellapsedTime;
}
function focusOnDiv() {}
function focusOnDiv1() {
    var divId = "";
    if (document.getElementById('typedAnswer'))
        divId = 'typedAnswer';
    else if (document.getElementById('answer'))
        divId = 'answer';
    //setTimeout(function() {
    $('#' + divId).focus();
    /*}, 0);
    	$('#'+divId).bind("blur", function() {
     setTimeout(function() {
     $('#'+divId).focus();
     }, 0);
    	});*/
}

$(document).click(function(e) {

                  var target = $(e.target), article;

                  if (!target.is('select')) {
                  focusOnDiv1();
                  }
                  });

function mockScoreCalc() {
    var langId = 0, totalQues = 0, ques = '', isParentLAQCorrect = false;
    for (var k = 1; k < iOAP.languages.length; k++) {
        if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
            langId = k;
            break;
        }
    }
    for (var groupNo = 0; groupNo < mockVar.groups.length; groupNo++) {
        var temp_iOAP = mockVar.groups[groupNo], grpSectCounter = 0;
        for (var i = 1; i < temp_iOAP.secDetails.length; i++) {
            if (temp_iOAP.secDetails[i].isOptional == 'N' || (temp_iOAP.secDetails[i].isOptional == 'Y' && temp_iOAP.secDetails[i].isSelected)) {
                grpSectCounter++;
                var sectionScore = 0, evaluatedQues = 0, correctCount = 0, totalSecMarks = 0;
                totalQues = temp_iOAP.sections[i][langId].length - 1;
                for (var j = 1; j <= totalQues; j++) {
                    var questionStatus = temp_iOAP.viewLang[i][j].status;
                    var quesLangId = temp_iOAP.viewLang[i][j].langID;
                    ques = temp_iOAP.sections[i][quesLangId][j];
                    if (j == 1)
                        totalSecMarks += eval(ques.allottedMarks * temp_iOAP.secDetails[i].maxOptQuesToAns);
                    if (questionStatus == "answered" || (questionStatus == "marked" && ques.answer != "" && mockVar.isMarkedForReviewConsidered == "YES")) {
                        if (ques.quesType == "SA" || ques.quesType == "COMPREHENSION@@SA" || ques.quesType == "LA@@SA") {
                            evaluateSAQues(ques);
                        } else if (ques.quesType == "TYPING") {
                            evaluateTypingQues(ques, groupNo);
                        } else if (ques.quesType != "SUBJECTIVE") {
                            if (ques.quesType.indexOf("@@") !=-1 ) {
                                if (ques.quesType.split('@@')[0] == 'LA') {
                                    if (ques.isParent) {
                                        evaluateLAnCompreQues(ques);
                                        isParentLAQCorrect = ques.isCorrect;
                                    }
                                    if (isParentLAQCorrect)
                                        evaluateLAnCompreQues(ques);
                                } else if (ques.quesType.split('@@')[0] == 'COMPREHENSION') {
                                    evaluateLAnCompreQues(ques);
                                }
                            } else if (ques.quesType == 'MCQ') {
                                evaluateMCQ(ques);
                            } else if (ques.quesType == 'MSQ') {
                                evaluateMSQ(ques);
                            }
                        }
                        sectionScore += eval(calcualteScore(ques, questionStatus));
                        if (ques.isEvaluated) {
                            evaluatedQues++;
                        } else {
                            ques.quesAnsStatus = 'Not Evaluated';
                        }
                        if (ques.isCorrect) {
                            correctCount++;
                            ques.quesAnsStatus = 'Correct';
                        } else {
                            if (ques.isEvaluated) {
                                ques.quesAnsStatus = 'Incorrect';
                            }
                        }
                    }
                }
                if (!temp_iOAP.isTypingGroup) {
                    temp_iOAP.secDetails[i].totalSecMarks = totalSecMarks;
                    temp_iOAP.secDetails[i].sectionScore = sectionScore;
                    temp_iOAP.secDetails[i].totalEvaluatedQues = evaluatedQues;
                    temp_iOAP.secDetails[i].totalCorrectQues = correctCount;

                }
            }
        }
    }
}

function showScoreCard() {
    var langId = 0;
    for (var k = 1; k < iOAP.languages.length; k++) {
        if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
            langId = k;
            break;
        }
    }
    var str = "<div class='examSummaryHeader' id='scoreCardHeader'><span class='header'>" + mockVar.mockName + "</span>", typingStr = '';
    var qtr = "";
    str += "<table width='80%' align='center'><tr><td style='text-align:left'><b>" + mockLabels.candName + "</b>&nbsp;" + mockVar.my_fullname + "</td><td style='text-align:right'><b>" + mockVar.loginLabel + " : </b>"+mockVar.my_username+"</td></tr></table></div>";
    str += "<div id='sc_group_summary' style='width:100%;overflow:auto;text-align:left'>";
    for (var groupNo = 0; groupNo < mockVar.groups.length; groupNo++) {
        var totalGrpQues = 0, totalGrpAttempted = 0, totalGrpCorrect = 0, totalGrpIncorrect = 0, totalGrpScore = 0, totalGrpNotEvaluated = 0, totalGrpMarks = 0, grpSectCounter = 0;
        var temp_iOAP = mockVar.groups[groupNo], typing_iOAP = mockVar.typingGroup[groupNo];
        if (temp_iOAP.isTypingGroup) {
            if (mockVar.groups.length > 1)
                typingStr += "<br><span style='margin-left:10%'><b>" + mockVar.groups[groupNo].groupName + "</b></span>";
            typingStr += "<table class='bordertable' cellspacing=0 width='80%' align='center'>";
            typingStr += "<tr><th width='20%'>" + mockLabels.secName + "</th><th width='10%'>" + mockLabels.keyStrokesCount + "</th><th width='10%'>" + mockLabels.backspaceCount + "</th><th width='10%'>" + mockLabels.elapsedTime + "</th><th width='10%'>" + mockLabels.gwpm + "</th><th width='10%'>" + mockLabels.nwpm + "</th><th width='10%'>" + mockLabels.accuracy + "</th></tr>";
        } else {
            if (mockVar.groups.length > 1)
                str += "<br><span style='margin-left:10%'><b>" + mockVar.groups[groupNo].groupName + "</b></span>";
            str += "<table class='bordertable' cellspacing=0 width='80%' align='center'>";
            str += "<tr><th width='20%'>" + mockLabels.secName + "</th><th width='10%'>" + mockLabels.noOfQues + "</th><th width='10%'>" + mockLabels.attempted + "</th><th width='10%'>" + mockLabels.correct + "</th><th width='10%'>" + mockLabels.incorrect + "</th>";
            if (temp_iOAP.hasOfflineSect)
                str += "<th width='10%'>" + mockLabels.notEvaluated + "</th>";
            str += "<th width='10%'>" + mockLabels.secScore + "</th>";
            if (mockVar.displayPercentageScore)
                str += "<th width='10%'>" + mockLabels.secPercent + "</th>";
            str += "</tr>";
        }
        for (var i = 1; i < temp_iOAP.secDetails.length; i++) {
            if (temp_iOAP.secDetails[i].isOptional == 'N' || (temp_iOAP.secDetails[i].isOptional == 'Y' && temp_iOAP.secDetails[i].isSelected)) {
                grpSectCounter++;
                if (temp_iOAP.isTypingGroup) {
                    typingStr += "<tr><td width='20%'>" + temp_iOAP.secDetails[i].secName + "</td><td width='10%'>" + typing_iOAP.keyStrokesCount + "</td><td width='10%'>" + typing_iOAP.backSpaceCount + "</td><td width='10%'>" + (typing_iOAP.ellapsedTime / 60).toFixed(2) + "</td><td width='10%'>" + typing_iOAP.GWPM + "</td><td width='10%'>" + typing_iOAP.NWPM + "</td><td width='10%'>" + typing_iOAP.accuracy + "</td></tr>";
                } else {
                    str += "<tr><td width='20%'>" + temp_iOAP.secDetails[i].secName + "</td><td width='10%'>" + (temp_iOAP.sections[i][langId].length - 1) + "</td><td width='10%'>" + temp_iOAP.secDetails[i].answered + "</td><td width='10%'>" + temp_iOAP.secDetails[i].totalCorrectQues + "</td><td width='10%'>" + (temp_iOAP.secDetails[i].totalEvaluatedQues - temp_iOAP.secDetails[i].totalCorrectQues) + "</td>";
                    if (temp_iOAP.hasOfflineSect)
                        str += "<td width='10%'>" + (temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].totalEvaluatedQues) + "</td>";
                    str += "<td width='10%'>" + temp_iOAP.secDetails[i].sectionScore + "</td>";
                    if (mockVar.displayPercentageScore)
                        str += "<td width='10%'>" + ((temp_iOAP.secDetails[i].sectionScore / temp_iOAP.secDetails[i].totalSecMarks) * 100).toFixed(2) + "</td>";
                    str += "</tr>";
                    qtr += "<br><span style='margin-left:10%'><b>" + temp_iOAP.secDetails[i].secName + "</b></span>";
                    qtr += "<table class='bordertable' cellspacing=0 width='80%' align='center'>";
                    qtr += "<tr><th width='20%'>" + "Question Id" + "</th><th width='10%'>" + "Your Answer" + "</th><th width='10%'>" + "Result" + "</th><th width='10%'>" + "Marks Awarded" + "</th></tr>";
                    var quesLangId = 0, totalQues = 0;
                    totalQues = temp_iOAP.sections[i][langId].length - 1;
                    for (var j = 1; j <= totalQues; j++) {
                    quesLangId = eval(temp_iOAP.viewLang[i][j].langID);
                    ques = temp_iOAP.sections[i][quesLangId][j];
                    obtainedMarks = eval(calcualteScore(ques, temp_iOAP.viewLang[i][j].status));
                    qtr += "<tr><th width='20%'>" + "<a style=\"cursor:pointer;color:#0000ff\" onclick=\"window.open('http://mockat.com/solution/"+ques.quesID+"/','Answer with explaination','width=1000,height=600')\">"+ques.quesID+"</a>"+"</th><th width='10%'>" + ques.answer + "</th><th width='10%'>" + ques.quesAnsStatus + "</th><th width='10%'>" + obtainedMarks + "</th></tr>";
                    }
                    qtr += "</table>";
                    totalGrpQues += temp_iOAP.sections[i][langId].length - 1;
                    totalGrpAttempted += temp_iOAP.secDetails[i].answered;
                    totalGrpCorrect += temp_iOAP.secDetails[i].totalCorrectQues;
                    totalGrpIncorrect += temp_iOAP.secDetails[i].totalEvaluatedQues - temp_iOAP.secDetails[i].totalCorrectQues;
                    totalGrpNotEvaluated += temp_iOAP.secDetails[i].answered - temp_iOAP.secDetails[i].totalEvaluatedQues;
                    totalGrpScore += temp_iOAP.secDetails[i].sectionScore;
                    totalGrpMarks += temp_iOAP.secDetails[i].totalSecMarks;
                }
            }
        }
        if (grpSectCounter > 1) {
            str += "<tr><td width='20%'>Total</td><td width='10%'>" + totalGrpQues + "</td><td width='10%'>" + totalGrpAttempted + "</td><td width='10%'>" + totalGrpCorrect + "</td><td width='10%'>" + totalGrpIncorrect + "</td>";
            if (temp_iOAP.hasOfflineSect)
                str += "<td width='10%'>" + totalGrpNotEvaluated + "</td>";
            str += "<td width='10%'>" + totalGrpScore + "/" + totalGrpMarks + "</td>";
            if (mockVar.displayPercentageScore)
                str += "<td width='10%'>" + ((totalGrpScore / totalGrpMarks) * 100).toFixed(2) + "</td>";
            str += "</tr>";
        }
        str += "</table>";
        typingStr += "</table>";
    }
    str = str + typingStr + qtr + "</div></center>";
    $('#questionContent').hide();
    $("#scoreSummaryDiv").html(str);
    $('#scoreCardDiv').show();
    $('#scoreCardPrcdBtn').val(mockLabels.proceedBtnLabel);
    $('#scoreSummaryDiv').height($('#scoreCardDiv').outerHeight(true) - $('#scoreCardBtnDiv').outerHeight(true));
    $('#sc_group_summary').height($('#scoreSummaryDiv').outerHeight(true) - $('#scoreCardHeader').outerHeight(true));
}

function evaluateSAQues(ques) {
    var possibleAnswers = new Array();
    var lowerLimit = 0, upperLimit = 0, splitedAnswer = '', proceed = true;
    ques.isEvaluated = true;
    if (ques.answer.indexOf('.')!=-1) {
        if (ques.answer.split('.').length > 2)
            proceed = false;
    }
    if (ques.answerType == 'SET' || ques.answerType == 'EQUALS') {
        possibleAnswers = ques.correctAnswer[0].split('<sa_ans_sep>');
    } else if (ques.answerType == 'RANGE') {
        splitedAnswer = ques.correctAnswer[0].split('<sa_ans_sep>');
        lowerLimit = splitedAnswer[0] < splitedAnswer[1] ? splitedAnswer[0] : splitedAnswer[1];
        upperLimit = splitedAnswer[0] < splitedAnswer[1] ? splitedAnswer[1] : splitedAnswer[0];
    }
    // numeric keyboard
    if (ques.keyboardType == 1) {
        if (ques.answerType == 'RANGE') {
            if (proceed && ques.answer > lowerLimit && ques.answer < upperLimit) {
                ques.isCorrect = true;
            }
        } else {
            for (var i = 0; i < possibleAnswers.length; i++) {
                if (ques.answerType == 'EQUALS') {
                    if (ques.answer == possibleAnswers[i]) {
                        ques.isCorrect = true;
                    }
                } else if (ques.answerType == 'SET') {
                    if (proceed && ques.answer == possibleAnswers[i]) {
                        ques.isCorrect = true;
                        break;
                    }
                }
            }
        }
    }
    // alphanumeric keyboard
    if (ques.keyboardType == 2) {
        for (var i = 0; i < possibleAnswers.length; i++) {
            if (ques.answerType == 'EQUALS') {
                if (ques.isCaseSensitive == "TRUE" && ques.correctAnswer[0] == ques.answer) {
                    ques.isCorrect = true;
                } else if (ques.isCaseSensitive == "FALSE" && ques.correctAnswer[0].toUpperCase() == ques.answer.toUpperCase()) {
                    ques.isCorrect = true;
                }
            } else if (ques.answerType == 'SET') {
                if (proceed && ques.isCaseSensitive == "TRUE" && ques.answer == possibleAnswers[i]) {
                    ques.isCorrect = true;
                    break;
                } else
                    if (proceed && ques.isCaseSensitive == "FALSE" && ques.answer.toUpperCase() == possibleAnswers[i].toUpperCase()) {
                        ques.isCorrect = true;
                        break;
                    }
            }
        }
    }
}

function evaluateLAnCompreQues(ques) {
    if (ques.quesType.split('@@')[1] == 'SA')
        evaluateSAQues(ques);
    if (ques.quesType.split('@@')[1] == 'MSQ')
        evaluateMSQ(ques);
    if (ques.quesType.split('@@')[1] == 'MCQ')
        evaluateMCQ(ques);
}

function evaluateMCQ(ques) {
    ques.isEvaluated = true;
    if (ques.correctAnswer == ques.answer)
        ques.isCorrect = true;
}

function evaluateMSQ(ques) {
    ques.isEvaluated = true;
    var proceed = true;
    var MSQAnswers = ques.correctAnswer;
    var givenMSQAnswers = ques.answer.split(',');
    proceed = checkMSQ(givenMSQAnswers, MSQAnswers);
    if (proceed) {
        proceed = checkMSQ(MSQAnswers, givenMSQAnswers);
    }
    if (proceed) {
        ques.isCorrect = true;
    }
}

function checkMSQ(array1, array2) {
    var proceed = true;
    for (var i = 0; i < array1.length - 1; i++) {
        if ($.inArray(array1[i], array2)==-1) {
            proceed = false;
            break;
        }
    }
    return proceed;
}

function calcualteScore(ques, questionStatus) {
    var score = 0;
    if (ques.isCorrect) {
        score += ques.allottedMarks;
    } else if (ques.isEvaluated) {
        score -= ques.negMarks;
    }
    return score;
}

function evaluateTypingQues(ques, groupId) {
    var grossWords = 0, netWords = 0, elapsedTime;
    temp_iOAP = mockVar.typingGroup[groupId];
    elapsedTime = temp_iOAP.ellapsedTime;
    // restricted typing
    if (ques.typingType == 1) {
        grossWords = (temp_iOAP.keyStrokesCount + temp_iOAP.restrictedErrors) / 5;
        netWords = temp_iOAP.keyStrokesCount / 5;
    }
    // unrestricted typing
    else if (ques.typingType == 2) {
        grossWords = temp_iOAP.keyStrokesCount / 5;
        netWords = (temp_iOAP.keyStrokesCount - temp_iOAP.wrongCharCount) / 5;
    }
    temp_iOAP.GWPM = ((grossWords / elapsedTime) * 60).toFixed(2);
    temp_iOAP.NWPM = ((netWords / elapsedTime) * 60).toFixed(2);
    temp_iOAP.accuracy = ((temp_iOAP.NWPM / temp_iOAP.GWPM) * 100).toFixed(2);
}

function loadLabel() {
    var xmlFileName = "", xml;
    $('#languageSelect').val(mockVar.langName);
    xmlFileName = mockVar.langName;
    xml = readAndReturnXML('media/LangXML/' + xmlFileName + '.xml');
    $('#showOptionalSecSummary').html($(xml).find('OptionSectionInfo').text());
    if (iOAP.noOptSec > 0) {
        $('#noOptSec').html(iOAP.noOptSec);
        $('#maxOptSec').html(iOAP.maxNoOptSec);
        $("#showOptionalSecSummary").show();
    } else {
        $("#showOptionalSecSummary").hide();
    }
    mockLabels.nextQ = $(xml).find('Next').text();
    $('#usefulDataLink span').text($(xml).find('UsefulData').text());
    $('#usefulDataDivRight a span').text($(xml).find('UsefulData').text());
    $('#usefulDataDivLeft a span').text($(xml).find('UsefulData').text());
    $('#showCalc a span').text($(xml).find('Calculator').text());
    mockLabels.timeLeft = $(xml).find('TimeLeft').text();
    //$('#candidateName').text($(xml).find('Candidate').text());
    $('.candOriginalName').html(mockVar.candName);
    mockLabels.candidate = $(xml).find('Candidate').text();
    $('.sect').text($(xml).find('Section').text());
    mockLabels.usefulData = $(xml).find('UsefulData').text();
    mockLabels.correctAnswerMarks = $(xml).find('MarksForCorrectAnswer').text();
    mockLabels.negativeMarks = $(xml).find('NegativeMarks').text();
    mockLabels.questionType = $(xml).find('QuestionType').text();
    mockLabels.questionNo = $(xml).find('QuestionNum').text();
    mockLabels.viewIn = $(xml).find('ViewIn').text();
    $('.viewIn').text($(xml).find('ViewIn').text());
    mockLabels.markForReview = $(xml).find('MarkForReview').text();
    mockLabels.markForReviewNext = $(xml).find('MarkForReviewNext').text();
    $('#clearResponse').val($(xml).find('ClearResponse').text());
    mockLabels.savenext = $(xml).find('SaveAndNext').text();
    mockLabels.save = $(xml).find('Save').text();
    mockLabels.markAsAnswered = $(xml).find('MarkAsAnswered').text();
    $('#viewingSect').html($(xml).find('YouAreViewing').text());
    $('#quesPallet').text($(xml).find('QuestionPalette').text());
    $('#legendLabel').text($(xml).find('Legend').text());
    $('#answeredLabel').text($(xml).find('Answered').text());
    $('#notAnsweredLabel').text($(xml).find('NotAnswered').text());
    $('#markedLabel').text($(xml).find('Marked').text());
    $('#notVisitedLabel').text($(xml).find('NotVisited').text());
    $('#viewProButton').val($(xml).find('Profile').text());
    $('#viewInstructionsButton').val($(xml).find('Instructions').text());
    $('#viewQPButton').val($(xml).find('QuestionPaper').text());
    $('#finalSub').val($(xml).find('Submit').text());
    $('#finalTypingSub').val($(xml).find('Submit').text());
    $('#submitCodeBtn').val($(xml).find('SubmitCode').text());
    $('#compileCodeBtn').val($(xml).find('Compile').text());
    mockLabels.yes = $(xml).find('Yes').text();
    mockLabels.no = $(xml).find('No').text();
    mockLabels.back = $(xml).find('Back').text();
    mockLabels.reset = $(xml).find('Reset').text();
    mockLabels.resetSect = $(xml).find('ResettingMessage1').text();
    mockLabels.submitExam = $(xml).find('SubmitExam').text();
    mockLabels.submitGrp = $(xml).find('SubmitGroup').text();
    $('.back').val($(xml).find('Back').text());
    $('#keyStrokesCountTd').html($(xml).find('KeyStrokesCount').text());
    $('#backspaceCountTd').html($(xml).find('BackSpaceCount').text());
    $('#errorCountTd').html($(xml).find('ErrorCount').text());
    $('#totalWordCount').html($(xml).find('TotalWordCount').text());
    $('#typedWordCount').html($(xml).find('TypedWordCount').text());
    $('#remainingWordCount').html($(xml).find('PendingWordCount').text());
    $('#typingInstruSpan b').html($(xml).find('Instructions').text());
    $('#resInstru1').html($(xml).find('TypingInstructionRestricted1').text());
    $('#resInstru2').html($(xml).find('TypingInstructionRestricted2').text());
    $('#resInstru3').html($(xml).find('TypingInstructionCommon1').text());
    $('#resInstru4').html($(xml).find('TypingInstructionCommon2').text());
    $('#unresInstru1').html($(xml).find('TypingInstructionUnrestricted1').text());
    $('#unresInstru2').html($(xml).find('TypingInstructionUnrestricted2').text());
    $('#unresInstru3').html($(xml).find('TypingInstructionUnrestricted3').text());
    $('#unresInstru4').html($(xml).find('TypingInstructionCommon1').text());
    $('#unresInstru5').html($(xml).find('TypingInstructionCommon2').text());
    mockLabels.optSectResetMsg = $(xml).find('OptionalSectionWarningMessage').text();
    mockLabels.selSectToReset = $(xml).find('SectionSelectionToReset').text();
    $(xml).find('OptionalSectionSummary').each(function() {
                                               mockLabels.optSectSummary = $(this).text();
                                               mockLabels.optSectName = $(this).attr('OptionalSectionName');
                                               mockLabels.secName = $(this).attr('SectionName');
                                               mockLabels.noOfQues = $(this).attr('NoOfQuestions');
                                               mockLabels.answered = $(this).attr('Answered');
                                               mockLabels.notAnswered = $(this).attr('NotAnswered');
                                               mockLabels.markReview = $(this).attr('MarkForReview');
                                               mockLabels.notAttempted = $(this).attr('NotVisited');
                                               });
    $(xml).find('ExamSummary').each(function() {
                                    mockLabels.examSummary = $(this).text();
                                    mockLabels.curGrp = $(this).attr('CurrentGroup');
                                    mockLabels.keyStrokesCount = $(this).attr('GrossKeyStrokesCount');
                                    mockLabels.backspaceCount = $(this).attr('BackSpaceCount');
                                    mockLabels.elapsedTime = $(this).attr('ElapsedTime');
                                    mockLabels.yetToAttempt = $(this).attr('YetToAttempt');
                                    mockLabels.attemptedGrp = $(this).attr('AttemptedGroup');
                                    mockLabels.canView = $(this).attr('ViewAllowed');
                                    mockLabels.canNotView = $(this).attr('ViewNotAllowed');
                                    mockLabels.canEdit = $(this).attr('EditAllowed');
                                    mockLabels.canNotEdit = $(this).attr('EditNotAllowed');
                                    });
    mockLabels.deselectOptSect = $(xml).find('DeselectingMessage').text();
    mockLabels.breakTimeLeft = $(xml).find('BreakTimeLeft').text();
    mockLabels.markAnsTitle = $(xml).find('MarkedAndAnswered').text();
    mockLabels.markNotAnsTitle = $(xml).find('MarkedAndNotAnswered').text();
    mockLabels.optSectTitle = $(xml).find('ActionButtonHoverMessage2').text();
    mockLabels.grpEditNotAllowedTitle = $(xml).find('ActionButtonHoverMessage1').text();
    mockLabels.maxQuesCrossedWithMarkReview = $(xml).find('QuestionLimitMessageOnlyAnswered').text();
    mockLabels.maxQuesCrossedWithoutMarkReview = $(xml).find('QuestionLimitMessageWithMarkedForReview').text();
    $(xml).find('ScoreCard').each(function() {
                                  mockLabels.candName = $(this).attr('CandidateName');
                                  mockLabels.secScore = $(this).attr('SectionScore');
                                  mockLabels.secPercent = $(this).attr('SectionPercentage');
                                  mockLabels.gwpm = $(this).attr('GrossWPM');
                                  mockLabels.nwpm = $(this).attr('NetWPM');
                                  mockLabels.accuracy = $(this).attr('Accuracy');
                                  mockLabels.attempted = $(this).attr('Attempted');
                                  mockLabels.correct = $(this).attr('Correct');
                                  mockLabels.incorrect = $(this).attr('Incorrect');
                                  mockLabels.notEvaluated = $(this).attr('NotEvaluated');
                                  mockLabels.proceedBtnLabel = $(this).attr('Proceed');
                                  });
    $('#proceedToNextGrp').val($(xml).find('ProceedToNextGroup').text());
    $('#sysInstruLabel').html($(xml).find('Instructions').text());
    $('#otherInstruLabel').html($(xml).find('OtherImportantInstructions').text());
    $('#profileDetails').html($(xml).find('CandidateDetails').text());
    $('#candName').html($(xml).find('CandidateName').text());
    $('.cngLang').html($(xml).find('ChangeLanguage').text());
    $('#candDateOfBirth').html($(xml).find('CandDateOfBirth').text());
    if (mockVar.showEmailId == 'YES') {
        $("#emailIdText").html("<b>" + $(xml).find('CandidateEmailId').text() + "</b>");
    }
    if (mockVar.showContactNo == 'YES') {
        $("#contactNoText").html("<b>" + $(xml).find('CandidateMobileNo').text() + "</b>");
    }
    $('#viewProButton').attr('title', $(xml).find('ProfileHover').text());
    $('#viewInstructionsButton').attr('title', $(xml).find('InstructionsHover').text());
    $('#viewQPButton').attr('title', $(xml).find('QuestionPaperHover').text());
    $('#finalSub').attr('title', $(xml).find('GroupSubmitTitle1').text());
    $('#finalTypingSub').attr('title', $(xml).find('GroupSubmitTitle1').text());
    mockLabels.quesNotAvailable = $(xml).find('AnswerSubmissionRequest6').text();
    mockLabels.timeOutSubmitMsg = $(xml).find('SummaryAlert1').text();
    mockLabels.typeCodeMsg = $(xml).find('CodeTypeMsg').text();
    mockLabels.compileAlertMsg = $(xml).find('CompileAlertMsg').text();
    mockLabels.executionAlertMsg = $(xml).find('ExecutionAlertMsg').text();
    mockLabels.compileSuccess = $(xml).find('CompileSuccessStatus').text();
    mockLabels.executionSuccess = $(xml).find('ExecutionSuccessStatus').text();
}

function loadIndexLabels() {
    var xmlFileName = 'English';
    if ($('#languageSelect').val() != null)
        xmlFileName = $('#languageSelect').val();
    xml = readAndReturnXML('media/LangXML/' + xmlFileName + '.xml');
    mockLabels.notMySystem = $(xml).find('NotMySystem').text();
    $('#LoginPageHeader').html($(xml).find('TestExpire3').text());
    $('#passwordLabel').html($(xml).find('GuestMode2').text());
    $('#changeLang').html($(xml).find('ChangeLanguage').text());
    $('#signInLabel').html($(xml).find('LoginPage4').text());
    $('#notMySystem').html($(xml).find('NameNotYours').text());
    $('#sysName').html($(xml).find('SystemName').text());
    $('#indexCandName').html($(xml).find('CandName').text());
    $('#subName').html($(xml).find('Subject').text());
    $('.candOriginalName').attr('title', mockVar.candName);
    $('.candOriginalName').html(mockVar.candName);
}

function loadInstruLabels() {
    getCookie();
    var xmlFileName = "", xml;
    $('#languageSelect').val(mockVar.langName);
    xmlFileName = mockVar.langName;
    xml = readAndReturnXML('media/LangXML/' + xmlFileName + '.xml');
    $('#instPaginationa').text($(xml).find('Next').text() + ' >>');
    mockLabels.next = $(xml).find('Next').text() + ' >>';
    mockLabels.previous = '<< ' + $(xml).find('Previous').text();
    $('#agreementMsg').html($(xml).find('AgreementMessage').text());
    $('#readylink font').text($(xml).find('ReadyToBegin').text());
    $('#defLang').text($(xml).find('ChooseYourDefaultLanguage').text());
    $('#multiLangInstru').text($(xml).find('DefaultLanguageMessage').text());
    $('.viewIn').html($(xml).find('ViewIn').text());
}

function feedbackPageLabel() {
    getCookie();
    var xmlFileName = "", xml;
    $('#languageSelect').val(mockVar.langName);
    xmlFileName = mockVar.langName;
    xml = readAndReturnXML('media/LangXML/' + xmlFileName + '.xml');
    $('#feedbackDiv h2 u').html($(xml).find('CandidateFeedbackForm').attr('Header'));
    $('#feedbackText').html($(xml).find('CandidateFeedbackForm').text());
    $('#header1').html($(xml).find('CandidateFeedbackForm').attr('TableHeader1'));
    $('#header2').html($(xml).find('CandidateFeedbackForm').attr('TableHeader2'));
    $('#header3').html($(xml).find('CandidateFeedbackForm').attr('TableHeader3'));
    $('#ques1').html($(xml).find('CandidateFeedbackQuestion1').text());
    $('#ques2').html($(xml).find('CandidateFeedbackQuestion2').text());
    $('#ques3').html($(xml).find('CandidateFeedbackQuestion3').text());
    $('#ques31').html($(xml).find('CandidateFeedbackQuestion3a').text());
    $('#ques32').html($(xml).find('CandidateFeedbackQuestion3b').text());
    $('#ques33').html($(xml).find('CandidateFeedbackQuestion3c').text());
    $('#ques34').html($(xml).find('CandidateFeedbackQuestion3d').text());
    $('#ques35').html($(xml).find('CandidateFeedbackQuestion3e').text());
    $('#ques36').html($(xml).find('CandidateFeedbackQuestion3f').text());
    $('#ques4').html($(xml).find('CandidateFeedbackQuestion4').text());
    $('.exceedExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption1'));
    $('.metExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption2'));
    $('.needImprove').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption3'));
    $('.failedExpect').text($(xml).find('CandidateFeedBackOptions').attr('CandidateFeedBackOption4'));
    $('#submit').val($(xml).find('Submit').text());
}

function loadClosePageLabel() {
    getCookie();
    var xmlFileName = "", xml;
    $('#languageSelect').val(mockVar.langName);
    xmlFileName = mockVar.langName;
    xml = readAndReturnXML('media/LangXML/' + xmlFileName + '.xml');
    $('#closeMsg').html($(xml).find('ClosePageMessage').text());
    $('#closeBtn').val($(xml).find('ClosePageMessage').attr('CloseBtnText'));
}

function selLang(langVal) {
    mockVar.langName = langVal;
    loadIndexLabels();
    loadLabel();
    showModule('profileDiv');
    activeLink('viewProButton');
}

function selViewLang(langVal) {
    mockVar.langName = langVal;
}

function setCookie(viewInLang) {
    var date = new Date();
    date.setTime(date.getTime() + (5 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = "viewLangName=" + viewInLang + expires + "; path=/";
}

function setCandCookie() {
    var entityId = "1";
    var candId = "123456";
    var checkSum = "password";
    var candName = "Candidate Name";
    document.cookie = "entityId=" + entityId;
    document.cookie = "app_seq_no=" + candId;
    document.cookie = "checksum=" + checkSum;
    document.cookie = "username=" + candName;
    document.cookie = "path=/";
}

function getCandIdFromCookie(user_name, full_name) {
    //setCandCookie();
    var i, x, y, defLang = "", langName = "", candId = user_name, candName = full_name, ARRcookies = document.cookie;
    //alert((ARRcookies != null) +" and "+ (ARRcookies!=""));	
    if (ARRcookies != null && ARRcookies != "") {
        ARRcookies = ARRcookies.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == "defaultLang") {
                defLang = y;
            } else if (x == "viewLangName") {
                langName = y;
            } else if (x == "app_seq_no") {
                candId = y;
            } else if (x == "username") {
                candName = y;
            }
        }
    } else {
        //alert("Else part");
        window.location.href = "error13.html?E103";
    }
    if ((defLang != null && defLang != "") || (langName != null || langName != "") || (candId != null || candId != "")) {
        iOAP.defaultLang = unescape(defLang);
        mockVar.langName = (langName != null && langName != "") ? unescape(langName) : "English";
        mockVar.candId = unescape(candId);
        mockVar.candName = unescape(candName);
    } else {
        window.location.href = "error14.html?E103";
        
    }
    if (mockVar.storeCandResponse == 1 && mockVar.candId == "") {
        window.location.href = "error15.html?E108";
    }
}

function getCandName() {
    //setCandCookie();
    var i, x, y, defLang = "", langName = "", candId = "", candName = "John Smith", ARRcookies = document.cookie;
    if (ARRcookies != null && ARRcookies != "") {
        ARRcookies = ARRcookies.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == "username" && y != null && y != "") {
                candName = y;
            }
        }
    }
    mockVar.candName = unescape(candName);
    //if(mockVar.storeCandResponse == 1 && (mockVar.candName == null || mockVar.candName == "" || mockVar.candName == "John Smith")){		
    //	window.location.href="error.html?E111";
    //}
}

function saveCandResponse() {
    result.mockId = mockVar.mockId;
    result.orgId = mockVar.orgId;
    result.candidateId = mockVar.candId;
    var langId = 0, quesLangId = 0, totalQues = 0, currentGroup = 0, queno = 0, obtainedMarks = 0;
    var ques = "", quesStatus = "", GWPM = 0, NWPM = 0, accuracy = 0;
    for (var k = 1; k < iOAP.languages.length; k++) {
        if (iOAP.languages[k] != null && typeof(iOAP.languages[k]) != 'undefined') {
            langId = k;
            break;
        }
    }
    for (var groupNo = 0; groupNo < mockVar.groups.length; groupNo++) {
        GWPM = 0, NWPM = 0, accuracy = 0;
        currentGroup = mockVar.groups[groupNo];
        if (currentGroup.isTypingGroup) {
            typingGrpObj = mockVar.typingGroup[groupNo];
            GWPM = typingGrpObj.GWPM;
            NWPM = typingGrpObj.NWPM;
            accuracy = typingGrpObj.accuracy;
        }
        for (var i = 1; i < currentGroup.secDetails.length; i++) {
            totalQues = currentGroup.sections[i][langId].length - 1;
            for (var j = 1; j <= totalQues; j++) {
                quesLangId = eval(currentGroup.viewLang[i][j].langID);
                ques = currentGroup.sections[i][quesLangId][j];
                obtainedMarks = eval(calcualteScore(ques, quesStatus));
                result.questions[queno++] = new QuestionResultBean(ques.quesID, ques.quesType, quesLangId, ques.answer, obtainedMarks, ques.quesAnsStatus, GWPM, NWPM, accuracy);
            }
        }
    }
    sendResponseToServlet();
}

function sendResponseToServlet() {
    var cookieValue = null;
    var name = "csrftoken";
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    var jsonString = JSON.stringify(result);
    google_news_articles = [];
    google_news_articles.push(jsonString);
    $('#pWait').show();
    $.ajax({
           type: "POST",
           url: mockVar.candResponseUrl,
           async: false,
           data: {
           'csrfmiddlewaretoken': cookieValue,
           'google_news_articles[]': google_news_articles
           },
           dataType: "text",
           success: function (data) {
           
           alert("Your response has been succesfully saved");
           $('#pWait').hide();
           mockVar.submitted = true;
           moveToScoreCardDisplay();
           },
           error: function () {
           //alert(filePath)
           window.location.href = "errorquizpost.html?E404";
           }
           });
}

function compileCode() {
    if (editor.getValue().trim().length != 0) {
        alert(mockLabels.compileAlertMsg);
        var question = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
        question.programingStatus = 'CompiledSuccess';
        compileSuccessMsg();
        quizPageHeight();
    }
}

function executeCode() {
    if (editor.getValue().trim().length != 0) {
        alert(mockLabels.executionAlertMsg);
        var question = iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues];
        fnSubmit('submitPrograming');
        question.programingStatus = 'ExecutedSuccess';
        executionSuccessMsg();
        quizPageHeight();
    }
}

function executionSuccessMsg() {
    $("#progStatusDisplay").show();
    $("#statusText").html(mockLabels.executionSuccess);
    $("#TestCaseReport").show();
}
function compileSuccessMsg() {
    $("#progStatusDisplay").show();
    $("#statusText").html(mockLabels.compileSuccess);
}
