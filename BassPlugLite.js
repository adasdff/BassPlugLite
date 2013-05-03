/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * TERMS OF REPRODUCTION USE
 *
 * 1. Provide a link back to the original repository (this repository), as
 *         in, https://github.com/derpthebass/, that is well-visible
 * 		wherever the source is being reproduced.  For example, should you
 * 		display it on a website, you should provide a link above/below that
 *		which the users use, titled something such as "ORIGINAL AUTHOR".
 *
 * 2. Retain these three comments:  the GNU GPL license statement, this comment,
 * 		and that below it, that details the author and purpose.
 *
 * Failure to follow these terms will result in me getting very angry at you
 * and having your software tweaked or removed if possible.  Either way, you're
 * still an idiot for not following such a basic rule, so at least I'll have
 * that going for me.
 *
 * Original Author -
 * @derpthebass (Caleb)
 */

var bplAutowoot = false;
var bplAutojoin = false;

$('#BassPlugLite.js').remove();

function BassPlugLite(){
    $('#BPL-Menu').remove();
    $('#dj-console').prepend('<div id="BPL-Menu"></div>');
    $('#BPL-Menu').append(
        '<p id="BPL-Autowoot">Autowoot</p>' +
            '<p id="BPL-Autojoin">Autojoin</p>' +
            '</div>'
    );

    var updateChat = function(from, message){
        Models.chat.receive({
            type: "update",
            from: from,
            message: message,
            language: Models.user.data.language
        })
    };

    updateChat("", "Running BassPlugʟɪᴛᴇ V. 1.03");
//Core Functions
    API.addEventListener(API.DJ_ADVANCE, function(data){

        if(bplAutowoot){setTimeout(function(){
            new RoomVoteService(1);
        }, 2000);
        }
        if(bplAutojoin && $("#button-waitlist-leave").is(':visible') === false){
            new WaitlistJoinService();
        }
    });

    API.addEventListener(API.CHAT, function(data){
       if(data.message.indexOf("!disable") > -1 && Models.room.data.staff[data.fromID] > 1 && data.type === "mention") {
           if(bplAutojoin){
           jQuery("#BPL-Autojoin").click();
           Models.chat.sendChat("@"+data.from+" - BPʟ Autojoin disabled!");
           }else{
           Models.chat.sendChat("@"+data.from+" - BPʟ Autojoin was not enabled!")
           }
       }
    });

//CSS/jQuery
    jQuery("#BPL-Autowoot").on("click", function() {
        bplAutowoot = !bplAutowoot;
        jQuery(this).css("border-color", bplAutowoot ? "rgba(0, 255, 41, 0.35)" : "rgb(87, 0, 0)");
    });
    jQuery("#BPL-Autojoin").on("click", function() {
        bplAutojoin = !bplAutojoin;
        jQuery(this).css("border-color", bplAutojoin ? "rgba(0, 255, 41, 0.35)" : "rgb(87, 0, 0)");
    });

    jQuery("#BPL-Autowoot") .hover(function(event){
            jQuery(this).css("border-style", "ridge");
        },
        function(event){
            jQuery(this).css("border-style", "solid");
        });
    jQuery("#BPL-Autojoin") .hover(function(event){
        jQuery(this).css("border-style", "ridge");
    },
     function(event){
        jQuery("#BPL-Autojoin").css("border-style", "solid");
    });
    $('body').prepend('<style type="text/css" id="BPL-CSS">'
        + '#BPL-Menu {position: absolute; top: 78px;}'
        + '#BPL-Autojoin {cursor: pointer; position: absolute; color:#3B3B3B; font-variant: small-caps; left: 258px; font-size: 12px; cursor: pointer; padding: 2px 2px 2px 2px;  border-style: solid; border-width: 1px; border-radius: 2px; border-color: rgb(87, 0, 0); margin-bottom: 1px; margin-top: 3px;}'
        + '#BPL-Autowoot {cursor: pointer; position: absolute; color:#3B3B3B; font-variant: small-caps; left: 4px; font-size: 12px; cursor: pointer; padding: 2px 2px 2px 2px;  border-style: solid; border-width: 1px; border-radius: 2px; border-color: rgb(87, 0, 0); margin-bottom: 1px; margin-top: 3px;}');

}

BassPlugLite();
