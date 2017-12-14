<template>
    <div class="container" id="app">
   <div class="row">
    <div class="medium-2 column" style="text-align:left;">
      <div v-if="skills.length > 0">
        <span v-for="(skill, index) in skills" :key="index"  v-on:click="loadSkill(skill)">{{skill.name}} <br/></span>
      </div>
    </div>
    <div class="medium-10 column" v-if="chosenSkill">
   
        <iframe height="100%" width="100%" :src="chosenSkill.url" frameborder="1" allowfullscreen></iframe>
    </div>
  </div>
  <div class="row">
      <div class="medium-12 column" style="text-align:left">
            <p>Skills represent some of the most basic and yet most fundamental abilities your character possesses. As your character advances in level, he can gain new skills and improve his existing skills dramatically. This section describes each skill, including common uses and typical modifiers. Characters can sometimes use skills for purposes other than those noted here, at the GM&#8217;s discretion.</p>
            <div style="font-size: 14px;"><a name="TOC-Table-Skill-Summary"></a>
            
            <p style="font-size: 12px;"><b>C =</b> <a href="http://www.d20pfsrd.com/skills">Class Skill</a></p>
            </div>
            <h2 style="font-size: 24px; margin-top: 20px; border-bottom-style: solid; border-bottom-width: thin;"><a name="TOC-Acquiring-Skills"></a>Acquiring Skills</h2>
            <p>Each level, your character gains a number of skill ranks dependent upon your class plus your <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Intelligence-Int-" rel="nofollow">Intelligence</a> modifier. Investing a rank in a skill represents a measure of training in that skill. You can never have more ranks in a skill than your total number of Hit Dice.</p>
            <h2 style="font-size: 22px; margin-top: 35px;"><a name="TOC-Class-Skills"></a>Class Skills</h2>
            <p>In addition, each class has a number of favored skills, called <b>class skills</b>. It is easier for your character to become more proficient in these skills, as they represent part of his professional training and constant practice. You gain a +3 bonus on all class skills that you put ranks into. If you have more than one class and both grant you a class skill bonus, these bonuses do not stack.</p>
            <div style="font-size: 14px;">
            <table border="1" cellpadding="5"><caption style="text-align: left; font-weight: bold; padding: 10px 0px;">Table: Skill Ranks</caption>
            <thead>
            <tr>
            <th style="text-align: center;">Class</th>
            <th style="text-align: center;">Skill Ranks per Level</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/alchemist">Alchemist</a></td>
            <td style="text-align: center;">4 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/alternate-classes/antipaladin">Antipaladin</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/barbarian">Barbarian</a></td>
            <td style="text-align: center;">4 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/bard">Bard</a></td>
            <td style="text-align: center;">6 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/cavalier">Cavalier</a></td>
            <td style="text-align: center;">4 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/cleric">Cleric</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/druid">Druid</a></td>
            <td style="text-align: center;">4 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/fighter">Fighter</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/inquisitor">Inquisitor</a></td>
            <td style="text-align: center;">6 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/magus">Magus</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/monk">Monk</a></td>
            <td style="text-align: center;">4 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/oracle">Oracle</a></td>
            <td style="text-align: center;">4 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/paladin">Paladin</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/ranger">Ranger</a></td>
            <td style="text-align: center;">6 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/rogue">Rogue</a></td>
            <td style="text-align: center;">8 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/sorcerer">Sorcerer</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/summoner">Summoner</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/base-classes/witch">Witch</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            <tr>
            <td style="text-align: left;"><a href="http://www.d20pfsrd.com/classes/core-classes/wizard">Wizard</a></td>
            <td style="text-align: center;">2 + <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#35TOC-Intelligence-Int-" rel="nofollow">Int</a> modifier</td>
            </tr>
            </tbody>
            </table>
            <a name="table-skill-check-bonuses"></a>
            <table border="1" cellpadding="5"><caption style="text-align: left; font-weight: bold; padding: 10px 0px;">Table: Skill Check Bonuses</caption>
            <thead>
            <tr>
            <th style="text-align: center;">Skill</th>
            <th colspan="2">Skill Check is Equal To*</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td class="text">Untrained</td>
            <td class="text" style="text-align: center;" colspan="2">1d20 + ability modifier + racial modifier</td>
            </tr>
            <tr>
            <td class="text">Trained</td>
            <td class="text" style="text-align: center;" colspan="2">1d20 + skill ranks + ability modifier + racial modifier</td>
            </tr>
            <tr>
            <td class="text">Trained Class Skill</td>
            <td class="number" style="text-align: center;">1d20 + skill ranks + ability modifier + racial modifier + 3</td>
            </tr>
            <tr>
            <td style="font-size: 12px;" colspan="3">* <a href="http://www.d20pfsrd.com/equipment/armor#TOC-Armor-Check-Penalty" rel="nofollow">Armor check penalty</a> (ACP) applies to all <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Strength-Str-">Strength</a>&#8211; and <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Dexterity-Dex-">Dexterity</a>-based skill checks.</td>
            </tr>
            </tbody>
            </table>
            </div>
            <p>The number of skill ranks you gain when taking a level in one of the base classes is shown on <b>Table: Skill Ranks</b>. <a href="http://www.d20pfsrd.com/races/core-races/human" rel="nofollow">Humans</a> gain 1 additional skill rank per class level. Characters who take a level in a <a href="http://www.d20pfsrd.com/classes/character-advancement#TOC-Favored-Class" rel="nofollow">favored class</a> have the option of gaining 1 additional skill rank or an additional hit point . If you select a level in a new class, all of its class skills are automatically added to your list of class skills, and you gain a +3 bonus on these skills if you have ranks in them.</p>
            <h2 style="font-size: 22px; margin-top: 35px;"><a name="TOC-Skill-Checks1"></a>Skill Checks</h2>
            <p>When your character uses a skill, he isn&#8217;t guaranteed success. In order to determine success, whenever you attempt to use a skill, you must make a skill check.</p>
            <p>Each skill rank grants a +1 bonus on checks made using that skill. When you make a skill check, you roll 1d20 and then add your ranks and the appropriate ability score modifier to the result of this check. If the skill you&#8217;re using is a class skill (and you have invested ranks into that skill), you gain a +3 bonus on the check. If you are not trained in the skill (and if the skill may be used untrained), you may still attempt the skill, but you use only the bonus (or penalty) provided by the associated ability score modifier to modify the check. Skills can be further modified by a wide variety of sources—by your race, by a class ability, by equipment, by spell effects or magic items, and so on. See <b><a href="#table-skill-check-bonuses">Table: Skill Check Bonuses</a></b> for a summary of skill check bonuses.</p>
            <p>If the result of your skill check is equal to or greater than the difficulty class (or DC) of the task you are attempting to accomplish, you succeed. If it is less than the DC, you fail. Some tasks have varying levels of success and failure depending on how much your check is above or below the required DC. Some skill checks are opposed by the target&#8217;s skill check. When making an opposed skill check, the attempt is successful if your check result exceeds the result of the target.</p>
            <h3><a name="TOC-Taking-10-and-Taking-20"></a>Taking 10 and Taking 20</h3>
            <p>A skill check represents an attempt to accomplish some goal, usually while under some sort of time pressure or distraction. Sometimes, though, a character can use a skill under more favorable conditions, increasing the odds of success.</p>
            <div style="margin-left: 20px;">
            <p class="title"><a name="TOC-Taking-10"></a>Taking 10</p>
            <p>When your character is not in immediate danger or distracted, you may choose to take 10. Instead of rolling 1d20 for the skill check, calculate your result as if you had rolled a 10. For many routine tasks, taking 10 makes them automatically successful. Distractions or threats (such as combat) make it impossible for a character to take 10. In most cases, taking 10 is purely a safety measure—you know (or expect) that an average roll will succeed but fear that a poor roll might fail, so you elect to settle for the average roll (a 10). Taking 10 is especially useful in situations where a particularly high roll wouldn&#8217;t help.</p>
            <p class="title"><a name="TOC-Taking-20"></a>Taking 20</p>
            <p>When you have plenty of time, you are faced with no threats or distractions, and the skill being attempted carries no penalties for failure, you can take 20. In other words, if you a d20 roll enough times, eventually you will get a 20. Instead of rolling 1d20 for the skill check, just calculate your result as if you had rolled a 20.</p>
            <p>Taking 20 means you are trying until you get it right, and it assumes that you fail many times before succeeding. Taking 20 takes 20 times as long as making a single check would take (usually 2 minutes for a skill that takes 1 round or less to perform).</p>
            <p>Since taking 20 assumes that your character will fail many times before succeeding, your character would automatically incur any penalties for failure before he or she could complete the task (hence why it is generally not allowed with skills that carry such penalties). Common “take 20” skills include <a href="disable-device" rel="nofollow">Disable Device</a> (when used to open locks), <a href="escape-artist">Escape Artist</a>, and <a href="perception">Perception</a> (when attempting to find traps).</p>
            </div>
            <h2 style="font-size: 22px; margin-top: 35px;"><a name="TOC-Ability-Checks-and-Caster-Level-Checks1"></a>Ability Checks and Caster Level Checks</h2>
            <p>The normal take 10 and take 20 rules apply for ability checks. Neither rule applies to concentration checks or caster level checks.</p>
            <h2 style="font-size: 22px; margin-top: 35px;"><a name="TOC-Aid-Another"></a>Aid Another</h2>
            <p>You can help someone achieve success on a skill check by making the same kind of skill check in a cooperative effort. If you roll a 10 or higher on your check, the character you&#8217;re helping gets a +2 bonus on his or her check. (You can&#8217;t take 10 on a skill check to aid another.) In many cases, a character&#8217;s help won&#8217;t be beneficial, or only a limited number of characters can help at once.</p>
            <p>In cases where the skill restricts who can achieve certain results, such as trying to open a lock using <a href="disable-device" rel="nofollow">Disable Device</a>, you can&#8217;t aid another to grant a bonus to a task that your character couldn&#8217;t achieve alone. The GM might impose further restrictions to aiding another on a case-by-case basis as well.</p>
            <h2 style="font-size: 22px; margin-top: 35px;"><a name="TOC-Skill-Description-Format"></a>Skill Description Format</h2>
            <p>Skill descriptions adhere to the following guidelines.</p>
            <div style="margin-left: 20px;">
            <p><b>Skill Name</b>: The skill name line includes (in addition to the name of the skill) the following information.</p>
            <p><a name="TOC-Ability"></a><b>Key Ability</b>: The abbreviation of the ability whose modifier applies to the skill check.</p>
            <p><b>Trained Only</b>: If this notation is included in the skill name line, you must have at least 1 rank in the skill to use it. If this notation is omitted, the skill can be used untrained (with a rank of 0). If any special notes apply to trained or untrained use, they are covered in the Untrained section (see below).</p>
            <div class="content-sidebar">
            <div>FYI: More Information on Armor Check Penalties</div>
            <div style="padding: 10px;">
            <p>Any armor heavier than leather, as well as any shield, hurts a character&#8217;s ability to use <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Dexterity-Dex-" rel="nofollow">Dex</a>&#8211; and <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Strength-Str-" rel="nofollow">Str</a>-based skills. An armor check penalty applies to all <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Dexterity-Dex-" rel="nofollow">Dex</a>&#8211; and <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Strength-Str-" rel="nofollow">Strength</a>-based skill checks. A character&#8217;s encumbrance may also incur an armor check penalty.</p>
            <p><i>Shields</i>: If a character is wearing armor and using a shield, both armor check penalties apply.</p>
            <p><i>Nonproficient with Armor Worn</i>: A character who wears armor and/or uses a shield with which he is not proficient takes the armor&#8217;s (and/or shield&#8217;s) armor check penalty on attack rolls as well as on all <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Dexterity-Dex-" rel="nofollow">Dex</a>&#8211; and <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Strength-Str-" rel="nofollow">Str</a>-based ability and skill checks. The penalty for non-proficiency with armor stacks with the penalty for shields.</p>
            <p style="font-size: 12px;">[<a href="http://www.d20pfsrd.com/equipment/armor#TOC-Armor-Check-Penalty" target="_blank" rel="noopener">Source</a>]</p>
            </div>
            </div>
            <p><a name="acp"></a><b>Armor Check Penalty</b>: If this notation (<sup style="font-size: 10px;">ACP</sup>) is included in the skill name line, an <a href="http://www.d20pfsrd.com/equipment/armor#TOC-Armor-Check-Penalty" rel="nofollow">armor check penalty</a> applies to checks using this skill. If this entry is absent, an armor check penalty does not apply. <b>Note</b>: Armor check penalties apply to all <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Strength-Str-">Strength</a>&#8211; and <a href="http://www.d20pfsrd.com/basics-ability-scores/ability-scores#TOC-Dexterity-Dex-">Dexterity</a>-based Skills.</p>
            <p><b>Description</b>: The skill name line is followed by a general description of what using the skill represents.</p>
            <p><b>Check</b>: What a character (“you” in the skill description) can do with a successful skill check and the check&#8217;s Difficulty Class (DC).</p>
            <p><b>Action</b>: The type of action using the skill requires, or the amount of time required for a check.</p>
            <p><b>Try Again</b>: Any conditions that apply to successive attempts to use the skill successfully. If the skill doesn&#8217;t allow you to attempt the same task more than once, or if failure carries an inherent penalty (such as with the <a href="climb">Climb</a> skill), you can&#8217;t take 20. If this paragraph is omitted, the skill can be retried without any inherent penalty other than the additional time required.</p>
            <p><b>Special</b>: Any extra facts that apply to the skill, such as special effects deriving from its use or bonuses that certain characters receive because of class, feat choices, or race.</p>
            <p><b>Restriction</b>: The full utility of certain skills is restricted to characters of certain classes. This entry indicates whether any such restrictions exist for the skill.</p>
            <p><a name="TOC-Untrained"></a><b>Untrained</b>: This entry indicates what a character without at least 1 rank in the skill can do with it. If this entry doesn&#8217;t appear, it means that the skill functions normally for untrained characters (if it can be used untrained) or that an untrained character can&#8217;t attempt checks with this skill (for skills that are designated “Trained Only”).</p>
            </div>    
      </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'skills',
  data: function() {
      return {
        skills: [],
        chosenSkill: ''
    }
       
  },
  methods: {
    loadSkill: function(skill) {
        console.log(skill.name);
      this.chosenSkill = skill;
    }
  },
  mounted() {
    axios.get("./json/skills.json")
    .then(response => {this.skills = response.data;    })
  }
};
</script>
