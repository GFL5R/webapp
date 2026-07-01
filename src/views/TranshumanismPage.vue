<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Transhumanism</h1>

    <p class="kicker">The Augmentation of the Human Body</p>

    <p>Transhumanism is the practice of augmenting the human body with technology originally developed for T-Dolls. At its core, it bridges the biological and the synthetic: a human nervous system interfaced with Doll-grade circuitry, a living mind running on hardware that was never meant for living minds. The result is something between human and machine. The people who undergo it call it evolution. The people who sell it call it medicine. Everyone else calls it expensive.</p>

    <p>The technology exists because Collapse radiation created a class of patients for whom conventional medicine had no answers. Late-stage ELID destroys the body beyond surgical repair. For those with enough money and desperation, transhumanism offers a trade.</p>

    <SectionDivider label="THE TECHNOLOGY" />

    <h2>Adapting T-Doll Hardware</h2>

    <p>T-Doll components were never designed for organic tissue. A Doll's frame routes power, data, and sensor input through standardized interfaces that assume a synthetic host. Adapting those interfaces for a human body requires a <strong>neural bridge</strong>: a surgically implanted junction that translates electrochemical nerve signals into the digital protocols a Doll's hardware understands, and vice versa. The bridge sits at the brainstem, wired into the central nervous system through microfilament conduits that thread along the spinal column.</p>

    <p>The bridge is the minimum requirement for any transhuman augmentation. Without it, a human body cannot communicate with T-Doll components at all. With it, the options expand considerably: artificial limbs that respond like the originals, sensory modules that feed directly into perception, <router-link to="/modules">T-Doll modules</router-link> installed alongside the bridge's supporting hardware.</p>

    <p>The bridge itself carries risk. The surgery takes twelve hours. The recovery takes months. Some patients never fully adapt; their bodies reject the filaments, or their brains never learn to interpret the synthetic signals correctly. For those who do adapt, the bridge becomes as natural as any other part of the nervous system.</p>

    <SectionDivider label="PARTIAL AUGMENTATION" />

    <h2>Partial Augmentation</h2>

    <p>Partial augmentation replaces or enhances specific parts of the body using T-Doll components. This is the most common form of transhumanism and the only form most people will ever encounter. It is expensive but accessible to the upper tiers of Green Zone society and to operators who have saved carefully or taken lucrative hazard contracts.</p>

    <h3>Artificial Limbs</h3>

    <p>A T-Doll limb grafted to a human host performs at the full specification of the original component. Arms that can crush steel. Legs that can sprint for hours without fatigue. Hands with integrated weapon interfaces and subdermal armor plating. The limbs look obviously artificial unless covered with synthskin, and most transhumans do not bother. The aesthetic broadcasts capability. In the Yellow Zones, that broadcast keeps trouble away.</p>

    <p>Limb replacement requires the neural bridge plus a recovery period of two to four weeks per limb. During recovery, the patient experiences phantom sensations as the brain remaps its body schema to accommodate the new hardware. These sensations fade.</p>

    <h3>T-Doll Modules</h3>

    <p>With a neural bridge installed, certain <router-link to="/modules">T-Doll modules</router-link> can be integrated into a human body. The bridge handles power routing and data translation; the module operates as it would in a Doll's frame, drawing from the same energy reserves and interfacing with the same neural pathways. A human with a <router-link to="/modules#targeting-array">Targeting Array</router-link> sees targeting overlays superimposed on their natural vision. A human with a <router-link to="/modules#reflex-booster">Reflex Booster</router-link> reacts faster than any unaugmented soldier.</p>

    <p>Not every module is compatible with organic tissue. Modules that assume a fully synthetic power grid or that require Doll-specific frame architecture simply do not work. A competent surgeon can tell a patient which modules are viable before anyone picks up a scalpel.</p>

    <h3>Remoulding Units</h3>

    <p>A transhuman with a neural bridge can support a <router-link to="/modules#remoulding-unit">Remoulding Unit</router-link>, granting access to <router-link to="/techniques/remoulding">remoulding techniques</router-link>. The bridge translates the unit's collapse-channeling protocols into signals the human nervous system can process. The experience is qualitatively different from a T-Doll's: a transhuman using remoulding feels the collapse energy as heat behind the eyes, pressure in the chest, a metallic taste that lingers for hours afterward. The techniques work. The cost is felt in the body, not just in the XP spent.</p>

    <RulesCallout>
      <p>Transhumans can install and use Remoulding Units. The <router-link to="/remoulding-failure-table">Remoulding Failure Table</router-link> applies normally, but transhumans who roll on the table also add one point to their Collapse track per mishap, representing the collapse energy bleeding into living tissue.</p>
    </RulesCallout>

    <SectionDivider label="FULL-BODY CONVERSION" />

    <h2>Full-Body Conversion</h2>

    <p>Full-body conversion is the extreme end of transhumanism: the extraction of the nervous system and vital organs from a failing human body for housing inside a sealed <strong>containment unit</strong>, which is then connected to a fully synthetic Doll frame. The brain, spinal column, heart, and lungs are removed intact and suspended in a nutrient bath that maintains biological function indefinitely. The containment unit handles everything the original body once did: oxygenation, circulation, waste filtration, immune regulation. The Doll frame provides locomotion, sensory input, and physical interaction with the world.</p>

    <p>This is transplantation of the self into an artificial body. The containment unit is the patient now. The frame is a vehicle.</p>

    <h3>Who Undergoes Conversion</h3>

    <p>Full-body conversion exists for one clinical indication: late-stage ELID in a patient wealthy enough to afford it. By the time silicification reaches the organs, no amount of surgery can save the original body. The containment unit is sealed against Collapse radiation. The brain, once extracted and suspended, is no longer exposed to the contamination that was killing it. ELID progression halts.</p>

    <p>In practice, the people who undergo conversion are corporate executives, military command staff, Old World wealth that survived the Collapse, and the occasional bounty hunter who stumbled into a fortune and a terminal diagnosis in the same month. The procedure costs more than most people earn in a lifetime. The waiting list is controlled by a handful of surgical teams operating out of White Zone medical facilities. Payment is upfront.</p>

    <h3>The Surgery</h3>

    <p>Full-body conversion is among the most dangerous medical procedures ever attempted. The patient is placed under deep anesthesia while the surgical team opens the cranial vault, exposes the spinal column, and begins the process of severing and preserving every nerve bundle that connects the central nervous system to the body. The brain must be perfused with oxygenated solution throughout; even momentary interruption causes irreversible damage. The spinal column is lifted out intact. The heart and lungs follow, connected to the containment unit's circulation system before the originals are disconnected from the dying body.</p>

    <p>The surgery takes thirty to forty hours. Multiple teams rotate through. The survival rate hovers around forty percent, and that number includes only patients who were healthy enough to be candidates in the first place. For a late-stage ELID patient already suffering organ failure, the odds are worse. Most families say goodbye before the patient goes under.</p>

    <p>Patients who survive wake up in a body that is not theirs. The adjustment period is measured in months. Proprioception must be recalibrated. The Doll frame's sensorium is richer and stranger than anything human nerves evolved to process. Some converts describe the first weeks as drowning in light. Most adapt. A few do not, and spend the remainder of their lives sedated while their containment units keep them technically alive.</p>

    <h3>Life After Conversion</h3>

    <p>A full-body convert lives inside a Doll frame that is indistinguishable from any other T-Doll's body to outside observation. They eat, sleep, speak, and move like a Doll. They experience emotion through a neural interface that translates Doll-grade sensory protocols back into signals a human brain can interpret. The translation is not perfect. Converted individuals report that colors look slightly different, that music sounds flattened, that the texture of touch has a synthetic quality they cannot quite define. Most say they get used to it.</p>

    <p>The containment unit requires maintenance. The nutrient bath must be refreshed every six months. The circulation pump has a rated lifespan. If the unit fails, the brain dies within minutes. Converts live with the knowledge that their existence depends on a machine the size of a briefcase that hums quietly wherever they go.</p>

    <ExampleBox>
      <h4>The Last Option</h4>
      <p>A corporate VP contracts ELID during a Red Zone inspection tour. By the time symptoms appear, she is mid-stage with aggressive silicification. Her company's medical division gives her eighteen months. She liquidates her assets, calls in every favor accumulated over three decades, and secures a slot with a White Zone surgical team. The surgery takes thirty-six hours. She flatlines twice. When she wakes, she is looking at the ceiling of an operating theater through optical sensors that resolve individual dust motes at twenty meters. She spends six months learning to walk again. Five years later, she runs a bounty hunting outfit in the Yellow Zones.</p>
    </ExampleBox>

    <SectionDivider label="MECHANICS" />

    <h2>Mechanical Considerations</h2>

    <h3>Humanity</h3>

    <p>Partial augmentation has no inherent effect on a character's <router-link to="/humanity-and-fame">Humanity</router-link>. The bridge and its attached hardware are tools. How the character uses them determines whether their Humanity rises or falls, exactly as it would with any other capability.</p>

    <p>Full-body conversion is different. Waking up in a synthetic body after weeks of surgery is a fundamental rupture of identity. The character's Humanity immediately drops to a starting value of <strong>30</strong>, reflecting the disorientation of inhabiting a body that was not born and the psychological weight of depending on a machine for continued existence. From there, Humanity changes normally based on the character's actions.</p>

    <h3>Modules &amp; Remoulding</h3>

    <p>Transhuman characters follow the same rules as T-Dolls for <router-link to="/modules">module installation</router-link>. Module slots are determined by the character's frame and neural bridge capacity. A partially augmented human has fewer available slots than a T-Doll; the bridge itself consumes internal space and power budget that a native Doll frame would allocate to additional hardware.</p>

    <p>Full-body converts use the full module rules for T-Dolls. Their synthetic frame has the same capacity as any other Doll's body. The containment unit imposes no additional restrictions.</p>

    <RulesCallout>
      <ul>
        <li><strong>Partial Augmentation:</strong> Maximum 2 module slots. Cannot install modules that require a fully synthetic power grid.</li>
        <li><strong>Full-Body Conversion:</strong> Full T-Doll module slot allocation. All module types supported.</li>
        <li><strong>Remoulding:</strong> Available with a neural bridge and Remoulding Unit. Partial transhumans add +1 Collapse per failure table roll.</li>
      </ul>
    </RulesCallout>

    <h3>Collapse &amp; ELID</h3>

    <p>Partial augmentation can cure mid-stage ELID. Mid-stage silicification typically begins in the extremities: hands, feet, lower legs, forearms. Replacing the affected limbs with T-Doll components removes the contaminated tissue before the disease reaches the core. The neural bridge itself must be installed in healthy tissue, which means the surgery must happen before silicification spreads to the brainstem or spinal column. Once the bridge is in place and the affected limbs are replaced, the patient is functionally cured. The remaining organic body carries no active ELID. Regular monitoring continues, but the weekly Resolve check for progression is no longer required.</p>

    <p>Early-stage ELID can be resolved through conventional surgery without augmentation. Late-stage ELID has already reached the organs; by then, only full-body conversion offers any hope. Partial augmentation occupies the middle ground: aggressive enough to stop the disease, not so extreme that the patient must surrender their entire body.</p>

    <p>Partial augmentation offers no protection against future Collapse exposure. A transhuman with artificial limbs still has organic lungs, organic blood, and organic tissue for the radiation to destroy. Curing ELID once does not prevent contracting it again.</p>

    <p>Full-body conversion halts ELID progression entirely. The containment unit is sealed against radiation. The brain and organs are protected from further exposure. A converted character retains whatever ELID stage they had at the time of conversion (the damage already done does not heal), but the condition will not worsen. The weekly Resolve check for ELID progression is no longer required.</p>

    <p>However, the containment unit is not invulnerable. Direct damage to the unit can breach the seal. A breached containment unit exposes the organs to ambient radiation at full effect. Converts in high-radiation zones guard their units with the attention someone else might give to an infant.</p>

    <SectionDivider label="SOCIETY" />

    <h2>Transhumans in 2072</h2>

    <p>Transhumanism occupies an uncertain social position. The URNC officially classifies it as a medical procedure, which makes it legal. In practice, public attitudes range from fascination to disgust, often from the same person in the same conversation.</p>

    <p>Partial transhumans are common enough in PMC circles and Yellow Zone settlements that they draw little comment. An operator with a chrome arm and targeting optics is just another contractor with money spent in obvious places. Green Zone civilians sometimes stare. White Zone civilians pretend not to notice. In the frontier zones where most of the game takes place, augmentations are tools, and nobody asks where you got your tools.</p>

    <p>Full-body converts are rarer and provoke stronger reactions. The knowledge that a human mind lives inside a Doll's body disturbs people in ways they struggle to articulate. It blurs the line between human and T-Doll at exactly the point where society prefers that line to remain sharp. Converts exist in a legal gray area: treated as human for some purposes, as Doll for others, fully accepted as neither. Many choose to live in the Yellow Zones.</p>

    <p>T-Dolls themselves hold varied opinions. Some view transhumanism as a form of appropriation: humans taking Doll technology to escape the consequences of their own biology. Others see it as validation of what they have been saying for decades. If a human chooses to live in a synthetic body and is still considered human, then the body was never the part that mattered. By that logic, a T-Doll is no less a person than a full-body convert. The distinction between human and Doll collapses. Some T-Dolls argue this means they should be treated as fully human, with the same legal standing, the same rights, the same presumption of personhood that a convert receives by virtue of having once been born. Society is not ready to hear that argument. The T-Dolls making it are not interested in waiting.</p>

    <h3>Forced Conversion</h3>

    <p>Rumor holds that a handful of unscrupulous entities perform full-body conversions on healthy patients. The organs, limbs, and other viable tissue stripped from the original body are routed into the black market organ trade, where a single healthy heart commands more than most people earn in five years. The patient wakes up in a synthetic frame, told they consented to a life-saving procedure, and the original body is gone before they can ask what they were being saved from.</p>

    <p>No credible investigation has ever confirmed a case. The URNC dismisses the stories as Yellow Zone fearmongering. Medical ethics boards point out that the survival rate for conversion makes it a laughable method of organ harvesting; you would lose more patients than you would profit from. The people who claim to be victims are rarely believed. They tell their stories in fringe forums and basement bars, describing surgical scars they cannot prove exist on bodies they no longer have. Most are written off as unstable. A few have produced documentation that is difficult to dismiss and impossible to verify.</p>

    <p>For player characters, transhumanism costs something. It shifts how the world sees you and how you see yourself. Whether that trade is worth it depends on what you are running from and what you are running toward.</p>

    <PageNav :prev="prev" :next="next" />
  </ContentFrame>
</template>

<script setup>
import ContentFrame from '@/components/layout/ContentFrame.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import SectionDivider from '@/components/layout/SectionDivider.vue'
import RulesCallout from '@/components/callouts/RulesCallout.vue'
import ExampleBox from '@/components/callouts/ExampleBox.vue'
import PageNav from '@/components/layout/PageNav.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Transhumanism' }
]

const prev = { to: '/remoulding-failure-table', label: 'Failure Table' }
const next = { to: '/npcs', label: 'NPCs' }
</script>
