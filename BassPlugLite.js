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
 *         in, https://github.com/derpthebass/BassPlugLite, that is well-visible
 *      wherever the source is being reproduced.  For example, should you
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

bpl = {
    autowoot: false,
    clicks: 0,
    version: 3.00
    }

function BassPlugLite(){
window.BPLite = true;
    
//Core Functions
    API.on(API.DJ_ADVANCE, function(data){

        if(bpl.autowoot){setTimeout(function(){
            $("#woot").click();
        }, 2000);
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message == "!whosrunning" && (data.fromID == "50aeb07e96fba52c3ca04ca8" || "518a0d73877b92399575657b")){
            API.sendChat("@"+data.from+" I am running BassPlugLite V. "+bpl.version);
        }
    });

//CSS/jQuery
    $("#woot").click(function() {
        bpl.clicks++;
        if (bpl.clicks == 2){
            bpl.autowoot = !bpl.autowoot;
            bpl.clicks = 0;
            require('app/base/Context').trigger('notify', 'icon-woot', bpl.autowoot ? 'AutoWoot is now on' : 'AutoWoot is now off');
        }
        setTimeout(function(){
            bpl.clicks = 0;
        }, 1000);
    });
        
API.chatLog("Running BassPlugLite V. "+bpl.version);
}

if(typeof BPLite == "undefined" && API.enabled) BassPlugLite();
