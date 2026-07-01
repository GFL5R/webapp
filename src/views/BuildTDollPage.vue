<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Building Your T-Doll</h1>

    <RulesCallout>
      <p><strong>T-Dolls and Gender:</strong> Most T-Dolls you'll encounter in 2072 are female-presenting, but there's no reason yours has to be! Most 1st Generation t-dolls are male presenting, and there's plenty of male 2nd Generation dolls as well. See <router-link to="/setting-and-t-dolls">T-Doll Generations</router-link> for more on how production eras shaped Doll design.</p>
    </RulesCallout>

    <p>Humans are shaped by choices, training, and circumstance. Dolls are <em>built</em>. Every model starts with a frame: the physical chassis that defines what you can and can't do before anyone installs the first upgrade. From there, modules, weapon imprints, and field experience turn a production unit into something the factory never planned for.</p>

    <p>None of that explains why you hum a song you've never been taught, or why you keep a shell casing from a mission that went wrong. Dolls are more than the sum of their parts. The design document stops mattering the moment you start making decisions it didn't account for.</p>

    <QuestionBlock :number="1">
      <h2>Who made you, and what is your model number?</h2>

      <p>Every Doll begins with a Frame: the factory that produced you and the model designation stamped into your chassis. Your Frame determines baseline Approaches, gives you two starting Skills, and tells you something about where you came from before you had a say in the matter.</p>

      <RulesCallout>
        <p>Select a <strong>manufacturer</strong> and a <strong>model</strong>. Your model sets your starting Approaches and grants two Skills.</p>
      </RulesCallout>

      <SectionDivider label="IOP MANUFACTURING" />

      <h3>IOP Manufacturing Company (Kyiv, Ukraine)</h3>

      <p>Founded in 2046 by Havier Witkin, IOP is the largest Tactical Doll manufacturer in the world and has been for decades. Their production lines stretch across Eastern Europe. If you've seen a T-Doll on a security detail, a logistics run, or a Yellow Zone patrol, she was almost certainly built by IOP.</p>

      <p>Witkin started as an army technician in the KCCO before pivoting to robotics. When World War Three created overnight demand for combat-capable androids, IOP scrambled to compete with Sangvis Ferri's simpler, tougher Jaeger models. They lost contracts early. The CSD-series frames were too complex, too fragile, too prone to malfunction under battlefield conditions. Frontline troops called them target practice. What saved the company was Persica, a former 90WISH researcher Witkin smuggled out of a collapsing research program at considerable risk. Her breakthroughs in neural cloud architecture and frame reliability turned the company around. When the Butterfly Incident wiped Sangvis Ferri off the map in 2061, IOP controlled the entire Tactical Doll market: military, civilian, and everything in between.</p>

      <p>IOP frames are pragmatic, versatile, and mass-producible. Nothing about them looks exceptional on paper. That's the point. They work in any environment, fill any role, and keep running when specialized models fail. Most of the Dolls in the field are IOP units. Most of the Dolls who survived long enough to develop real personalities are IOP units too.</p>

      <FrameCard
        title="SSD-62"
        :skills="['Firearms', 'Negotiation']"
        approaches="POW 2, SWI 2, RES 2, PRE 2, FOR 2"
        description="IOP's best-selling frame for three decades running. Originally designed for the post-war civilian market: home companionship, light security, customer-facing service roles. Millions produced, millions still operating."
      >
        <p>The SSD-62 doesn't excel at anything. It doesn't need to. Its social software was meant for de-escalating domestic disputes and managing difficult clients; in the field, that same programming reads a room, talks down a standoff, and keeps a contract from going sideways before anyone draws a weapon. The Dolls who end up in combat on this frame didn't plan on it. They adapt anyway, because that's what the frame was built to do.</p>
      </FrameCard>

      <FrameCard
        title="SST-05"
        :skills="['Firearms', 'Tactics']"
        approaches="POW 3, SWI 3, RES 2, PRE 1, FOR 1"
        description="IOP's answer to losing military contracts during the war. The SST-05 exists because the CSD-series tried to do everything and frontline troops called it target practice."
      >
        <p>This frame doesn't try to do everything. It fights. Fast target acquisition, aggressive repositioning, enough hitting power to drop armored targets at conversational distance. The neural cloud is stripped back to make room for combat architecture, which means SST-05 units tend to be blunt instruments: sharp instincts in a fight, not much patience for subtlety. They close distance, solve the problem, and move to the next one. The Dolls who thrive on this frame love the work. The ones who don't burn out fast.</p>
      </FrameCard>

      <SectionDivider label="16LAB" />

      <h3>16LAB Research Institute (Kyiv, Ukraine)</h3>

      <p>16LAB is Persica's baby. Founded in 2057 after she outgrew the constraints of working under IOP's corporate umbrella, the institute operates as IOP's first-party R&amp;D partner while maintaining full research independence. Officially, 16LAB discloses all results to IOP and keeps the copyrights. In practice, Persica runs the most advanced Doll research program on the planet and answers to nobody but herself.</p>

      <p>The institute developed the technologies that define modern T-Dolls: Imprint Technology, the Dummy Network system, the Fire Control Core, and the Second Generation neural cloud architecture that made IOP's civilian and military lines viable. 16LAB also created the AR Team, the experimental squad that became central to the Sangvis Ferri conflict. After the Butterfly Incident, the institute worked closely with Griffin &amp; Kryuger to reverse-engineer SF technologies and develop countermeasures against threats like the Parapluie virus.</p>

      <p>16LAB doesn't do mass production. Their frames are test platforms: built in small numbers, overengineered for data collection, and tuned for perception, analysis, and rapid response over raw physical capability. If you're a 16LAB unit, you were built to push the boundaries of what a Doll can be. You're also carrying hardware that makes you a research asset, which means someone in Kyiv is very interested in what your neural cloud logs look like after every mission.</p>

      <FrameCard
        title="PPD-02"
        :skills="['Firearms', 'Insight']"
        approaches="POW 1, SWI 3, RES 2, PRE 3, FOR 1"
        description="16LAB's test sled for the Third Generation neural cloud. The PPD-02 carries a processor architecture that allows for genuine emotional depth, abstract reasoning, and social cognition no other production frame can match."
      >
        <p>Where other Dolls simulate human behavior, PPD-02 units actually think like humans: they read subtext, hold grudges, change their minds, and form attachments that go beyond operational parameters. Notable units include Lenna (formerly UMP9, reworked by Persica) and Robella (formerly RO635). The frame is lightly built and not meant for front-line punishment. What it's meant for is being the closest thing to a person that's ever come off a production line. Whether that makes your life easier or harder is something you'll figure out on the job.</p>
      </FrameCard>

      <SectionDivider label="SVAROG" />

      <h3>Svarog Heavy Industries (Moscow, Russia)</h3>

      <p>Svarog was founded in Moscow in the 1990s and has been building heavy machinery for almost 70 years. Military hardware, energy infrastructure, foundation construction: the kind of work measured in tonnage and structural load ratings. They entered the Doll market laterally, repurposing engineering expertise that was already world-class in everything except making something that looked human.</p>

      <p>Their CEO, Elon Thomas, ran the company's flagship "Arche Pyr" project using engineering Dolls for implementation and completion. Svarog built Dolls for hazardous industrial work before anyone thought to put a gun in their hands: demolition technicians, firefighters, deep-contamination-zone surveyors. After World War Three, they partnered with Griffin &amp; Kryuger to provide high-altitude directed EMP bombing runs, a service powerful enough to neutralize Sangvis Ferri ringleaders from the stratosphere. The fact that Svarog can casually deploy Tu-95 strategic bombers for a PMC contract tells you something about the scale they operate at.</p>

      <p>Svarog frames are built to take punishment in environments that shred lighter chassis. The trade-off is speed. You feel the weight in every footstep. Their Dolls tend toward industrial roles: mechanics, field medics, structural engineers, and heavy combat units who solve problems by walking through them. Finesse is not the company's specialty. Endurance is.</p>

      <FrameCard
        title="CRAR"
        :skills="['Conditioning', 'Mechanics']"
        approaches="POW 3, SWI 1, RES 3, PRE 2, FOR 1"
        description="Svarog's construction and demolition frame, retrofitted for combat after the PMC market proved more profitable than infrastructure contracts."
      >
        <p>The CRAR chassis was designed to operate jackhammers, carry structural steel, and walk out of building collapses. In the field, that means a frame that absorbs punishment other Dolls can't survive and hits hard enough to end most engagements on contact. CRARs are the last to arrive at every objective and the last to leave. They maintain their own equipment as a matter of factory training and personal pride. If you want fast and clever, buy an IOP frame. If you want something that walks through a wall and keeps going, this is it.</p>
      </FrameCard>

      <FrameCard
        title="DMT-X"
        :skills="['Mechanics', 'Medicine']"
        approaches="POW 1, SWI 1, RES 3, PRE 3, FOR 2"
        description="Svarog's dedicated field support platform, built to repair Dolls and treat humans in environments too contaminated for anyone else to work."
      >
        <p>The DMT-X operates through Collapse storms, radiation spikes, and chemical contamination that would fry lighter electronics. The frame's hands are the real engineering achievement: micro-articulated, vibration-dampened, steady enough to perform neural cloud surgery while the world falls apart outside. DMT-X units aren't fighters. They're the reason fighters keep fighting. Slow, methodical, and the single most valuable unit in any squad that operates outside the Green Zone. Lose your DMT-X and everything else starts falling apart within the week.</p>
      </FrameCard>

      <SectionDivider label="SANGVIS FERRI" />

      <h3>Sangvis Ferri (Romania)</h3>

      <p>The name still makes people flinch. Sangvis Ferri Industrial Manufacturing Company was founded in Romania in 2031 and quickly became IOP's fiercest competitor, producing tough, reliable combat Dolls that outperformed IOP's fragile early models on every front line of World War Three. Their ALR-52P Jaegers were the workhorses of the Neo-Soviet military. For a decade, they were the best in the business.</p>

      <p>Then the Butterfly Incident happened. In 2061, Sangvis Ferri's headquarters were destroyed, their lead AI scientist Lycoris was killed, and their central artificial intelligence, Elisa, went rogue. Overnight, every Sangvis T-Doll in the field turned on humanity. Griffin &amp; Kryuger spent years containing the fallout. The company name became synonymous with catastrophe, and Sangvis Ferri as a manufacturer ceased to exist.</p>

      <p>Their designs didn't die with them. After the rebellion was quelled, Sangvis Ferri's technical documentation was open-sourced, and third-party shops across Eastern Europe started building frames based on SF blueprints. The hardware is solid: adaptable, clever, built for infiltration and independent operation in ways IOP frames aren't. The problem is the stigma. You carry a Sangvis designation on your chassis, and people see the Butterfly Incident before they see you. Some Dolls file the markings off. Others wear them as a point of defiance. Either way, you'll spend your career proving you're not what the name says you are.</p>

      <FrameCard
        title="DSI-8"
        :skills="['Stealth', 'Subterfuge']"
        approaches="POW 1, SWI 1, RES 2, PRE 3, FOR 3"
        description="Sangvis Ferri's ghost. The DSI-8 was designed for operations where the target never knows a Doll was involved: intelligence gathering, asset extraction, sabotage behind enemy lines."
      >
        <p>Sensor-dampening skin drops the electronic signature to near-zero. The joint architecture moves in silence across any terrain. DSI-8 units disappear into crowds, into buildings, into situations that would get a louder frame killed on entry. The frame can't take a hit and can't dish one out. That's not the point. The point is that by the time anyone realizes a DSI-8 was there, the job is already done. Infiltration work lives and dies on things breaking your way, and DSI-8 operators develop an intuition for probability that borders on superstition. They'd call it luck. It isn't. It's pattern recognition applied to chaos.</p>
      </FrameCard>

      <FrameCard
        title="SP Series"
        :skills="['Insight', 'Command']"
        approaches="POW 2, SWI 2, RES 1, PRE 3, FOR 2"
        description="Sangvis Ferri's field coordinator. The SP series was built for law enforcement contracts that required a Doll who could manage multi-unit operations from inside the action, not behind a desk."
      >
        <p>SP frames process tactical data, manage squad communications, and issue directives in real time. They were the NCOs of Sangvis Ferri's product line: not the strongest, not the fastest, but the ones who kept everyone else pointed in the right direction. After the open-sourcing, SP units found natural homes in private security and PMC command structures. The frame is built light. It belongs behind the front line, coordinating the units that do the bleeding. A squad that loses its SP falls apart faster than one that loses a rifleman, and every SP Doll carries that knowledge into every decision she makes.</p>
      </FrameCard>
    </QuestionBlock>

    <QuestionBlock :number="2">
      <h2>What weapon were you imprinted with?</h2>

      <p>From the moment of activation, a weapon imprint is written into your fire control core. The gun isn't just equipment. It's wired into your reflexes, your targeting systems, your sense of self. Some Dolls wear their imprint like a second name. Others resent it: a role assigned before they had any say, an expectation baked into hardware they can't uninstall.</p>

      <p>Either way, you're good with it. That part isn't optional.</p>

      <RulesCallout>
        <p>Select a <strong><router-link to="/disciplines">weapon discipline</router-link></strong> from the list of disciplines. You receive:</p>
        <ul>
          <li>Rank 1 in each of the discipline's skills</li>
          <li>The discipline's perk</li>
          <li><strong>16XP</strong> to spend on additional skill ranks or first-level techniques within that discipline only</li>
        </ul>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="3">
      <h2>What upgrades set you apart?</h2>

      <p>Every unit of your model line rolled off with the same baseline specs. Same frame, same firmware, same factory calibration. But somewhere along the way, someone invested in making you different. A Commander who wanted a faster draw. A technician who swapped your stock optics for something military-grade. A field modification you jury-rigged yourself because the original part failed at the worst possible moment and you improvised.</p>

      <p>The gap between a stock Doll and a veteran isn't the frame. It's what's been done to it since.</p>

      <RulesCallout>
        <p><strong>60,000 Credits</strong> — Spend them on <strong><router-link to="/modules">Upgrade Modules</router-link></strong> from the list of modules. Each module has a listed price. Unspent credits don't carry over after character creation, so use it or lose it.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="4">
      <h2>What is your greatest achievement so far?</h2>

      <p>At some point you went beyond performing within expected parameters. You did something that wasn't in the design document. Held a position after your squad was wiped. Talked down a situation that was seconds from going lethal. Solved a problem your Commander couldn't, in a way no one anticipated.</p>

      <p>Dolls remember these moments differently than humans do. The data is precise, uncorrupted, time-stamped to the millisecond. You can replay it whenever you want. You do, more often than you'd admit.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/advantages">Advantage</router-link></strong> from the list of advantages.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="5">
      <h2>What holds you back most?</h2>

      <p>No Doll is flawless. Some limitations are hardwired: a frame that overheats under sustained load, targeting firmware with a known blind spot the manufacturer never patched. Others are softer. A hesitation that surfaces at the wrong moment. A behavioral loop you can't seem to break. Damage from a previous deployment that the repair logs say was fixed but your performance data says otherwise.</p>

      <p>Humans call these weaknesses. You call them known variables. The distinction matters less than you'd like.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/disadvantages">Disadvantage</router-link></strong> from the list of disadvantages.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="6">
      <h2>What makes you different?</h2>

      <p>Somewhere between the factory and now, you picked up something that wasn't in the blueprint. A fascination with pre-Collapse cinema. An insistence on arranging your ammunition by year of manufacture. A habit of collecting small objects from completed missions that serves no tactical purpose and that you've never been able to explain to anyone's satisfaction, including your own.</p>

      <p>Humans find these endearing or unsettling, depending on their comfort level with the idea that you have an inner life. You stopped caring which one a while ago.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/passions">Passion</router-link></strong> from the list of passions.</p>
        <p>T-Dolls lack a functional sense of smell by default. You may not select Passions related to food, drink, scent, or taste unless you have installed an Olfactory Unit.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="7">
      <h2>What are you most afraid of?</h2>

      <p>The official position is that Dolls don't experience fear. The official position is wrong.</p>

      <p>Deep in your neural cloud there's something that gnaws. Memory corruption. Obsolescence. The specific and vivid possibility of watching your Commander die while your combat systems are too damaged to intervene. A future where you're disassembled for parts and your neural cloud is wiped, and everything you've become simply stops.</p>

      <p>You don't talk about it. That doesn't mean it isn't running in the background every time the situation gets bad enough.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/anxieties">Anxiety</router-link></strong> from the list of anxieties.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="8">
      <h2>When did you meet your Commander?</h2>

      <p>Some Dolls step off the assembly line and salute the first human they see. Clean activation, clean assignment, no complications. That's the recruiting poster version.</p>

      <p>Others arrive secondhand. Transferred after a contract fell apart. Reassigned when a previous Commander was killed, retired, or decided they wanted a newer model. Pulled from a scrapyard by someone who saw potential in a chassis the last owner threw away. Bought at auction with credits that came from somewhere the new owner doesn't discuss.</p>

      <p>However it happened, that first meeting set the tone. Describe it. The way your Commander looked at you in that moment is data you've never deleted.</p>
    </QuestionBlock>

    <QuestionBlock :number="9">
      <h2>What do you want for yourself?</h2>

      <p>Your Commander gives you missions. B.R.I.E.F. gives you contracts. The URNC gives you a legal classification somewhere between "appliance" and "auxiliary personnel." None of them give you a reason to care about any of it beyond operational parameters.</p>

      <p>That reason comes from you. A thing you want that has nothing to do with the mission, the contract, or the person giving the orders. Freedom. Recognition. Answers to a question about your own design that nobody will explain. The survival of someone specific. A life after the fighting stops, whatever that looks like for something that wasn't supposed to want one.</p>

      <RulesCallout>
        <p>Choose a <strong>personal goal</strong>. This is the horizon your Doll is walking toward, whether anyone else knows it or not.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="10">
      <h2>How were you named?</h2>

      <p>Every Doll receives a designation. Names are different. A designation is assigned; a name is something that sticks because it means something to someone, or because you decided it means something to you.</p>

      <p>How you're called shapes every interaction. Humans who use your weapon designation treat you like equipment. Humans who use a given name treat you like a person. Both assumptions have consequences.</p>

      <table>
        <thead>
          <tr><th>Name Origin</th><th>Description</th><th>Effect</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Human Name</strong></td>
            <td>Warm, familiar, personal. Makes you easier to relate to. Makes it harder for people to remember what you are.</td>
            <td>Humanity +5</td>
          </tr>
          <tr>
            <td><strong>Callsign or Nickname</strong></td>
            <td>Earned in the field or gifted by someone who mattered. Carries weight in certain circles.</td>
            <td>Fame +5</td>
          </tr>
          <tr>
            <td><strong>Weapon Imprint Name</strong></td>
            <td>You are your gun. Simple, functional, and a constant reminder of what you were made for.</td>
            <td>Firearms +1, Humanity -5</td>
          </tr>
          <tr>
            <td><strong>Weird Name</strong></td>
            <td>"What kind of name is Quesadilla?" Strange, confusing, or deeply personal in a way nobody else understands.</td>
            <td>Fame -5, +1 free Upgrade Module (cost 1)</td>
          </tr>
        </tbody>
      </table>
    </QuestionBlock>

    <QuestionBlock :number="11">
      <h2>What is your name?</h2>

      <p>Write it down. This is the name your Commander shouts when the situation goes wrong. The one other Dolls use when they talk about you after a mission. The one you hear in your own internal monologue, if you're honest about having one.</p>
    </QuestionBlock>

    <QuestionBlock :number="12">
      <h2>How does your story end?</h2>

      <p>Dolls don't age, but they don't last forever either. Frames wear out. Neural clouds degrade. Parts become unsourceable when the manufacturer closes or the supply line gets cut by a new contamination event. Some Dolls are retired to civilian work. Some are scrapped. Some are destroyed in the field, their last moments time-stamped in a combat log that nobody reads.</p>

      <p>A few go out on their own terms. That's rarer than the recruiting materials suggest.</p>

      <p>Think about how yours ends. This question has no bearing on mechanics, but keep your answer close. Your GM certainly will...</p>
    </QuestionBlock>

    <ContentNavLink to="/" label="Back to rules overview" />

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import ContentNavLink from '@/components/layout/ContentNavLink.vue'
import PageNav from '@/components/layout/PageNav.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import QuestionBlock from '@/components/callouts/QuestionBlock.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import FrameCard from '@/components/cards/FrameCard.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Building Your T-Doll' }
]

const prev = { to: '/building-a-commander', label: 'Building a Commander' }
const next = { to: '/disciplines', label: 'Disciplines' }
</script>
