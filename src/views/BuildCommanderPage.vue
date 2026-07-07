<template>
  <ContentFrame>
    <Breadcrumb :crumbs="crumbs" />

    <h1>Building a Commander</h1>

    <p>Every Commander in this game begins in the same place: working as a licensed bounty hunter under B.R.I.E.F. The work is dangerous, often thankless, but it pays in credits, gear, and reputation. This chapter guides you step by step through creating your Commander: showing how you ended up here and what sets you apart.</p>

    <QuestionBlock :number="1">
      <h2>Where are you from?</h2>

      <p>In 2072, most surviving Green Zones are nominally under the URNC umbrella. But most people still hold onto the idea of nationality. Where you were born shapes how others see you, and how you see the world.</p>

      <RulesCallout>
        <p>Every Commander begins with all Approaches at <strong>1</strong>. Your nationality grants <strong>+1 to two Approaches</strong> and a small kit of practical gear suited to your homeland. No single Approach may exceed <strong>3</strong> at character creation.</p>
        <p><strong>Starting gear is listed under each nationality below.</strong></p>
      </RulesCallout>

      <TabCard :tabs="nationalityTabs">
        <template #FreeStates>
          <span class="data-label">FREE STATES OF AMERICA</span>
          <hr />
          <p><strong>Approaches:</strong> Swiftness +1, Power +1</p>
          <p><strong>Starting Gear:</strong> Duct Tape, Road Flare, Pocket Knife</p>
          <p>The United States is a shadow of its former self. The entire western seaboard was swallowed by Collapse contamination after Beilan capsules washed ashore from Alaska to Panama, and the interior is scarred by a civil war that has been raging since the 2050s. Your schoolbooks tell a story of glory followed by catastrophe. American soldiers pushed deep toward Moscow in 2050, until it came apart all at once. The economy imploded that summer, Operation Tradewind broke the Allied fleet in the Mediterranean, and back home the country tore itself open before the Soviets ever had to finish the job.</p>
          <p>When the American Rossartrist Alliance seized the federal seat on the east coast, the Free States, led by Texas, refused to let the new order take hold, launching a rebellion that rages to this day. Your people champion the old way of democracy, the stubborn belief that a free citizen does not need a single order handed down to know how to live. You are one of the last holdouts of national independence, and most people you know intend to keep it that way.</p>
          <p>You believe a citizen with a rifle and a T-Doll answers to nobody. You also believe America's real sin wasn't ambition; it was hesitation. Abandoning Japan, fumbling the Aurora bioweapons program, letting half-measures pile into total defeat. It's a laundry list of flinching at the moments that mattered, and you do not intend to flinch.</p>
        </template>

        <template #Rossartrist>
          <span class="data-label">AMERICAN ROSSARTRIST ALLIANCE</span>
          <hr />
          <p><strong>Approaches:</strong> Resilience +1, Precision +1</p>
          <p><strong>Starting Gear:</strong> Ration Brick, Multitool, Sturdy Boots</p>
          <p>The United States is a shadow of its former self. The entire western seaboard was swallowed by Collapse contamination after Beilan capsules washed ashore from Alaska to Panama, and the interior is scarred by a civil war that has been raging since the 2050s. Your schoolbooks tell a story of glory followed by catastrophe. American soldiers pushed deep toward Moscow in 2050, until it came apart all at once. The economy imploded that summer, Operation Tradewind broke the Allied fleet in the Mediterranean, and back home the country tore itself open before the Soviets ever had to finish the job.</p>
          <p>The old republic was rotten at its core, a loose confederation of states and interests that could not hold together in the face of conflict. A nation of capitalists and men with rifles who answered to nobody and called that freedom. The Alliance taking the federal seat on the east coast was the first step in a long process of righting the sinking ship. The westerners call you tyrants, but you know what their so called "freedom" really costs.</p>
          <p>You believe that the age of flags and borders is what nearly brought the world to its end, and that one singular order, if carried far enough, is the only thing that can prevent it all from happening again. You will not make the same mistakes as the America of the Past. No, your ideals ask everything from you, and you give it freely, in hopes of a better future.</p>
        </template>

        <template #NeoSoviet>
          <span class="data-label">NEO-SOVIET UNION</span>
          <hr />
          <p><strong>Approaches:</strong> Resilience +1, Power +1</p>
          <p><strong>Starting Gear:</strong> Canteen, Disposable Lighter, Paracord</p>
          <p>The Neo-Soviet Union was reborn in 2032 after a Bolshevik resurgence toppled the Russian Federation. When World War Three ground to a halt, your homeland was the last great power still standing: battered, starving, but unbroken. Soviet engineers pioneered Tactical Doll technology while the West was still feeding conscripts into the front lines. Your government fielded T-Dolls en masse before anyone else, and Operation Tradewind, the Mediterranean campaign that broke the American fleet, is the victory every schoolchild recites.</p>
          <p>You also know what they don't put in the schoolbooks. The KCCO special forces under General Carter nearly tore the country apart from the inside. The Singularity and Fireworks Incidents were treason, committed by your own military. The old guard who refused to join the URNC now rot in the Railway Corps, exiled to purification trains crawling through the deadliest Yellow Zones. Still wearing their medals, still seething.</p>
          <p>The Siberian Lifeline Program, the great railway restoration that used Dolls to reclaim contaminated territory no human could survive, is the story your people tell about themselves. Suffering builds strength. The Union endured because its people endured. Rossartrism is humanity's only path forward. You believe in bearing what others can't and hitting harder than anyone expects, because those are the things that kept your nation alive when everything else burned.</p>
        </template>

        <template #China>
          <span class="data-label">CHINA</span>
          <hr />
          <p><strong>Approaches:</strong> Precision +1, Fortune +1</p>
          <p><strong>Starting Gear:</strong> Compass, Ration Brick, Bottled Water</p>
          <p>Seven middle-school students broke into a forgotten relic containment site near Shanghai in 2030. The resulting Collapse Fluid detonation vaporized Shanghai, Suzhou, Wuxi, and Nantong. 400 million dead in the first hour. 870 million by final count. A 1.1-million-square-kilometer Red Zone swallowed the eastern seaboard, and the government evacuated the capital from Beijing to Xi'an.</p>
          <p>The cause was negligence. The Shanghai municipal government never reported the initial ELID infections. The quarantine was forgotten. The relics site had been paved over with apartment blocks decades earlier. One forgotten door, one billion dead, and your nation's name written permanently next to the word "catastrophe" in every history book on earth.</p>
          <p>That knowledge shaped you. You either obsess over getting every detail right, over never making the careless mistake that ends everything, or you understand in your bones that the distance between any person and obliteration is thinner than they think. Most of your people landed on both. Your communities rebuilt westward from Xi'an, methodical and exact, contributing to URNC decontamination with the quiet determination of a nation trying to atone for an apocalypse it accidentally started. You measure twice, and you never forget that the universe doesn't owe you a second chance. You come from the place where the world ended because someone forgot to lock a door.</p>
        </template>

        <template #LatinAmerica>
          <span class="data-label">LATIN AMERICA ALLIANCE</span>
          <hr />
          <p><strong>Approaches:</strong> Precision +1, Power +1</p>
          <p><strong>Starting Gear:</strong> Flashlight, Zip Ties, Hard Candy</p>
          <p>For decades before World War Three, Latin America lived under the boot of American interventionism. Independence movements crushed. Resources stripped to fuel the US war machine. And in 2048, the Aurora Experimental Unit turned your jungles into a laboratory, injecting Collapse Fluid into cheetahs, leopards, and bears to breed ELID bioweapons they couldn't even control. Your land was their petri dish.</p>
          <p>Then America's home front shattered. Political instability consumed the United States in 2050, and left-wing guerilla groups across South America launched coordinated offensives, retaking major cities from their occupiers with nothing but determination and captured NATO equipment. That liberation is the founding myth of everything you are. Precise, coordinated strikes by people who had nothing. Proof that even the mightiest empire crumbles when its foundation rots.</p>
          <p>Your communities rebuilt in the shadow of contamination zones and abandoned American military installations, scavenging what the gringos left behind and turning it into something new. The URNC gave your people some recognition. Old wounds run deeper than new treaties. You trust your own hands first, and you know that careful, targeted action topples giants.</p>
        </template>

        <template #Japan>
          <span class="data-label">JAPAN</span>
          <hr />
          <p><strong>Approaches:</strong> Resilience +1, Swiftness +1</p>
          <p><strong>Starting Gear:</strong> Chemlight, Basic Medical Supplies</p>
          <p>When the Beilan Island Incident hit in 2030, the trade winds pushed the worst of the Collapse Fluid away from your shores. Kansai took a direct hit and Kanto got coastal contamination, but Hokkaido, far north and mostly clean, became the obvious refuge. Tokyo was converted into a massive safe zone sheltering 1.2 million survivors. For a brief window, it looked like Japan would weather the storm.</p>
          <p>Then the Americans came. US Pacific Command forced your government to station troops in Hokkaido, eating up space that should have housed survivors. When the UN tried to relocate Tokyo refugees north through the Seikan Tunnel, anti-refugee sentiment among Hokkaido locals exploded. Politicians sympathetic to the US staged a coup. The American 3rd Fleet blockaded the Tsugaru Strait. Remaining UN staff were evacuated overnight. Millions abandoned in the Tokyo Protected Zone. Left to radiation and chaos.</p>
          <p>That memory is the bedrock of everything your people believe. No alliance is permanent. No one is coming to save you. Your nation rebuilt through sheer tenacity. By the URNC era, Japanese-origin Dolls and technology had become indispensable across the globe. You endure because your country survived being left for dead.</p>
        </template>

        <template #PanEuropean>
          <span class="data-label">PAN-EUROPEAN UNION</span>
          <hr />
          <p><strong>Approaches:</strong> Precision +1, Swiftness +1</p>
          <p><strong>Starting Gear:</strong> Binoculars, Pocket Knife</p>
          <p>Europe "won" World War Three. The victory was so pyrrhic that nobody uses the word without quotation marks. The Pan-European Union rose from the old EU's corpse after it dissolved during the German Civil War of 2044. The Northern Lights Incident of 2035 had already turned Scandinavia into an irradiated wasteland and flooded Central Europe with refugees. Six years of total war killed the equivalent of three thousand divisions. Your continent technically came out on top alongside the Neo-Soviet Union, but neither side had the strength to mount another offensive, so they called it peace.</p>
          <p>Frankfurt is the city that defines you. It's where the URNC was officially proclaimed in November 2064. It's also the city General Carter tried to level with bomber planes during his coup. Six million people targeted for slaughter, their bioenergy harvested for Paradeus's insane resurrection experiments. The Stasi, PECMAR reconstruction committees, Rossartrist chairwoman Gilda Ulrich: names burned into your memory. Symbols of a continent that learned to rebuild by committee, always one step ahead of the next catastrophe.</p>
          <p>Your culture values engineering, institution-building, and the discipline to think three moves ahead. Sloppiness killed the old world. Waiting around for someone else to act buried it. You learned both lessons.</p>
        </template>

        <template #Yugoslavian>
          <span class="data-label">YUGOSLAVIAN FEDERATION</span>
          <hr />
          <p><strong>Approaches:</strong> Fortune +1, Swiftness +1</p>
          <p><strong>Starting Gear:</strong> Disposable Lighter, Pack of Cigarettes, Duct Tape</p>
          <p>The Yugoslavian Federation occupies a strip of neutral territory wedged between the Neo-Soviet Union and the Pan-European Union: a buffer state that survived by never fully committing to either side. Belgrade, your former capital, lost that status because the suburbs turned into high-concentration contamination zones. By the 2060s the city ran on strict rationing, immigration quotas, and purification towers barely holding back the ELID tide.</p>
          <p>The irony stings. Your homeland was a stronghold of Rossartrism in its early days, preaching unity and open borders. The millions of Yellow Zone refugees at your gates called the Rossartrists hypocrites for not actually opening those borders, and retaliated by raiding Yugoslavian convoys. Idealism above, desperation below, and you in the middle making deals with both.</p>
          <p>Neo-Soviet peace talks in Belgrade got interrupted by a Paradeus terrorist assault during the Isomer incident. Conservative factions within your own Federation fought Rossartrism from the inside. Foreign intelligence agencies used your cities as neutral ground for shadow wars. The only constant is chaos, and the only survival strategy is being faster than everyone around you. In the Balkans, planning only gets you so far. The rest is luck.</p>
        </template>

        <template #NorthAfrican>
          <span class="data-label">NORTH AFRICAN UNION</span>
          <hr />
          <p><strong>Approaches:</strong> Precision +1, Resilience +1</p>
          <p><strong>Starting Gear:</strong> Canteen, Sleeping Bag, Road Flare</p>
          <p>Italy reclaimed Libya as a colonial holding after crushing a coup in 2037. The Second Algerian War erupted in 2039, one link in the chain of conflicts that destroyed the old United Nations. During World War Three, the Neo-Soviet Union held Tripoli while German forces pushed through the Libyan desert in late 2047. Before all that, European nations openly debated whether to invade Africa for resources or focus on reclaiming their own irradiated territory. That debate tells you everything about how the outside world has always seen your homeland: raw material, not people.</p>
          <p>You grew up in Yellow Zone settlements where nothing gets wasted and nothing gets overlooked. Every liter of clean water measured. Every filtration system calibrated. You know exactly how much Collapse radiation a human body absorbs before the ELID symptoms start, because that's not trivia here. It's survival arithmetic.</p>
          <p>The old colonial powers left behind military equipment, contaminated soil, and broken promises. The URNC's security zone once extended to your territory before the Antarctic Union carved off the southern reaches. You endure because your ancestors endured. You waste nothing, because in the desert, waste is death.</p>
        </template>

        <template #Australia>
          <span class="data-label">AUSTRALIA</span>
          <hr />
          <p><strong>Approaches:</strong> Fortune +1, Resilience +1</p>
          <p><strong>Starting Gear:</strong> Compass, Sleeping Bag, Hard Candy</p>
          <p>Australia sat far enough from Beilan Island's ground zero, far enough from the European and Asian theaters of World War Three, that your homeland dodged the worst of the Collapse contamination and the direct devastation of combat. "Spared" is the word people use. You use "lucky."</p>
          <p>That luck came with its own costs. Trade networks collapsed overnight. The resources your continent exported to Asia had nowhere to go. Refugee crises overwhelmed Pacific nations. The URNC's reach extends to your shores now, but the grip is loose; you exist on the periphery of a Eurasian-centered coalition, useful but not essential, autonomous in practice if not on paper.</p>
          <p>The outback was already trying to kill you before the Collapse. Your communities built self-sufficient settlements, traded with whoever showed up, and maintained a quiet independence that larger powers tolerate because you're too far away to bother subjugating. Toughness and humility in equal measure. Sometimes survival is just being in the right place and having the sense not to waste it.</p>
        </template>

        <template #YellowZone>
          <span class="data-label">YELLOW ZONE NATIVE</span>
          <hr />
          <p><strong>Approaches:</strong> Fortune +1, Power +1</p>
          <p><strong>Starting Gear:</strong> Gas Mask, Bottled Water, Paracord</p>
          <p>You don't have a flag. You don't have a government that knows your name. You were born in the contamination zones: irradiated wastelands where Collapse Fluid radiation ranges from survivable to slowly lethal, where ELID creatures roam dead forests, and where the URNC's authority is words on a map. The Yellow Zones hold millions of forgotten people: refugees who lost the lottery for Green Zone admission, descendants of soldiers abandoned when NATO collapsed, communities built around scavenged military equipment and crumbling infrastructure.</p>
          <p>You drink groundwater drawn from over a hundred meters deep. You read a Collapse storm before the instruments do. You've seen Varjager raiding parties, Paradeus cultists promising salvation, and URNC purification trains rolling through like mobile fortresses that never stop to help.</p>
          <p>Green Zone citizens call you "contaminated" and keep you behind immigration quotas. Bounty hunters and PMC operators treat you as expendable guides or cheap labor. But you know things they don't: where the clean water is, where the ELIDs nest, which ruins still have salvageable tech, which paths will kill anyone who doesn't know the radiation patterns by heart.</p>
        </template>
      </TabCard>
    </QuestionBlock>

    <QuestionBlock :number="2">
      <h2>What is your background?</h2>

      <p>Your nationality defines where you were born, but your background defines what you did before you became a bounty hunter.</p>

      <RulesCallout>
        <p>Your background grants <strong>+1 to one Approach</strong> and <strong>one starting Skill</strong>. It also provides tools of your trade and, for combat backgrounds, light armor. Feel free to come up with your own!</p>
        <p><strong>Starting gear is listed under each background below.</strong></p>
      </RulesCallout>

      <TabCard :tabs="backgroundTabs">
        <template #Military>
          <span class="data-label">MILITARY</span>
          <hr />
          <p><strong>Approach:</strong> Resilience +1 | <strong>Skill:</strong> Tactics</p>
          <p><strong>Starting Gear:</strong> Basic Medical Supplies, Flashlight; Armor: Tactical Vest</p>
          <p>You served. Not in some proxy conflict or corporate security detail. In an actual standing army, under a flag, with a chain of command that stretched up to generals with medals and ambitions. You learned to follow orders before you learned to question them, and somewhere along the way you started giving them.</p>
          <p>The uniform came off eventually. Peace treaties downsized armies overnight. Budget cuts purged officers who lacked political connections. Or a conscience finally broke under the weight of one order too many. You took the skills and left the loyalty behind.</p>
        </template>

        <template #PMC>
          <span class="data-label">PMC COMMANDER</span>
          <hr />
          <p><strong>Approach:</strong> Power +1 | <strong>Skill:</strong> Command</p>
          <p><strong>Starting Gear:</strong> Binoculars, Paracord; Armor: Concealable Vest</p>
          <p>Private Military Companies are everywhere in the URNC era: GRIFFIN, KCCO-affiliated contractors, regional outfits working Yellow Zone cleanup or corporate security for megacorps that can't trust the local police. You ran fireteams: mixes of human operators and T-Dolls working contracts that governments didn't want their names on.</p>
          <p>You know how to write an after-action report and how to bury one. Same skills, different client roster.</p>
        </template>

        <template #Corporate>
          <span class="data-label">CORPORATE DRONE</span>
          <hr />
          <p><strong>Approach:</strong> Precision +1 | <strong>Skill:</strong> Negotiation</p>
          <p><strong>Starting Gear:</strong> Multitool, Zip Ties</p>
          <p>The megacorps that survived the Collapse are enormous. SANGVIS FERRI used to be a Doll manufacturer before a certain incident turned their entire lineup hostile. 90WISHES, Ulrich Industries, and a dozen others fill the vacuum, processing decontamination contracts, logistics networks, and supply chains that span three continents. You worked inside that machine: managing shipping manifests, running procurement, tracking numbers on a spreadsheet where each row corresponded to someone's survival.</p>
          <p>Corporate work teaches you that everything has a price and everyone has a supervisor. You learned both lessons well enough to know when to stop following them.</p>
        </template>

        <template #Scavenger>
          <span class="data-label">SCAVENGER</span>
          <hr />
          <p><strong>Approach:</strong> Swiftness +1 | <strong>Skill:</strong> Survival</p>
          <p><strong>Starting Gear:</strong> Crowbar, Duct Tape, Road Flare</p>
          <p>You grew up in the ruins. Not a Green Zone with its purification towers and immigration quotas. The actual ruins. Collapsed suburbs, abandoned military outposts, dead cities where ELID infection rates make official habitation impossible and unofficial habitation a matter of reading the wind correctly. You learned to tell clean metal from contaminated by smell, to identify ELID movement patterns by sound, to find the one intact room in a collapsed building that still has salvageable gear.</p>
          <p>The only difference between that and bounty work is the pay.</p>
        </template>

        <template #Technician>
          <span class="data-label">TECHNICIAN</span>
          <hr />
          <p><strong>Approach:</strong> Precision +1 | <strong>Skill:</strong> Mechanics</p>
          <p><strong>Starting Gear:</strong> Multitool, Duct Tape, Chemlight</p>
          <p>T-Dolls don't maintain themselves. The neural cloud infrastructure, the combat chassis, the weapons integration systems: all of it needs skilled hands to keep running in a world where replacement parts sometimes cross three contamination zones to reach the front line. You were one of those hands. Doll repair, cybernetics calibration, field modification of equipment that wasn't designed to be field-modified: you've done all of it, usually under time pressure, often without the right tools.</p>
          <p>You understand Dolls differently than most Commanders do. You've seen the inside of their chassis and their diagnostic logs. You know they're more complicated than the people who give them orders usually bother to find out.</p>
        </template>

        <template #Medic>
          <span class="data-label">MEDIC</span>
          <hr />
          <p><strong>Approach:</strong> Resilience +1 | <strong>Skill:</strong> Medicine</p>
          <p><strong>Starting Gear:</strong> Medical Kit, Paracord</p>
          <p>Field medicine in the post-Collapse world means working with what you have, where you have it, on patients who can't be moved and whose injuries weren't supposed to be survivable. You trained somewhere (a hospital, a military unit, a PMC medical corps) and then you practiced in conditions that would have made your instructors flinch. ELID exposure protocols. Collapse Fluid contamination triage. Trauma surgery without adequate anesthesia in Yellow Zone settlements.</p>
          <p>You patched wounds, made calls about who to save when you couldn't save everyone, and kept moving. The job followed you into bounty work. At least this way it pays.</p>
        </template>

        <template #Criminal>
          <span class="data-label">CRIMINAL</span>
          <hr />
          <p><strong>Approach:</strong> Fortune +1 | <strong>Skill:</strong> Stealth</p>
          <p><strong>Starting Gear:</strong> Lock Picking Set, Zip Ties</p>
          <p>The black market doesn't call itself that. It calls itself necessity. In a world where Green Zone citizenship is rationed and entire populations survive outside official supply chains, someone has to move the food, medicine, weapons, and information that the legal economy won't provide or can't reach. You were part of that economy: running a crew, moving contraband across contamination zones, or selling intelligence to whoever could pay.</p>
          <p>You learned to read people, read rooms, know when to push and when to disappear.</p>
        </template>

        <template #Scholar>
          <span class="data-label">SCHOLAR</span>
          <hr />
          <p><strong>Approach:</strong> Swiftness +1 | <strong>Skill:</strong> Computers</p>
          <p><strong>Starting Gear:</strong> Compass, Journal and Pen, Bottled Water</p>
          <p>Real education is rare. The Collapse killed universities, dispersed libraries, interrupted the transmission of knowledge that civilization depends on. What survived is fragmented and fought over: pre-Collapse scientific research, historical records, philosophical frameworks for understanding what happened and what comes next. You got access to some of it: through a surviving institution, a personal collection, or a mentor stubborn enough to keep teaching when the world said it didn't matter.</p>
          <p>You think differently than most people around you. You see patterns, context, and consequences they miss entirely.</p>
          <p>Most Commanders don't read much. That gap is yours.</p>
        </template>
      </TabCard>
    </QuestionBlock>

    <QuestionBlock :number="3">
      <h2>What path have you chosen?</h2>

      <p>The question isn't whether you're capable. You made it this far.</p>

      <p>Some Commanders are most dangerous at the front, close enough to their Dolls to issue orders by voice. Others stay back, reading the full battlefield from a position that gives them perspective their units don't have. A few specialize in operating before the fight starts: contacts, intelligence, conditions set up so carefully that the firefight becomes optional.</p>

      <p>Your Discipline defines how you operate and what your Dolls will learn to expect from you. It shapes how you train, what risks you accept, and what kind of problems you walk toward instead of around.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/disciplines">Discipline</router-link></strong>. It is now unlocked for you, and you gain one rank in each of its skills, the perk, and one rank 1 technique of your choice within it. Your discipline also grants you a weapon of its type up to a set price. When in doubt, you get a handgun.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="4">
      <h2>How do you stand out in your field?</h2>

      <p>Commanders who survive in this work have something others don't. Not just training or experience: everyone who makes it this far has those. Something more specific. A trait that shows up under pressure and makes the difference when every other factor is equal.</p>

      <p>Luck is real. Pattern recognition is real. Stubbornness that borders on clinical: also real. Whatever it is, it's the reason you're still here when others who were equally trained are not.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/advantages">Advantage</router-link></strong> from the list of advantages.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="5">
      <h2>What holds you back the most?</h2>

      <p>You've survived this long. That doesn't mean you came through clean.</p>

      <p>Some flaws are visible: a temper, a dependency, a refusal to follow orders that conflict with your personal judgment. Others are harder to see from the outside. A fear you've buried. An assumption you've never examined. A line you've drawn somewhere that the job will eventually ask you to cross.</p>

      <p>Every Commander carries something. The dangerous ones know what it is.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/disadvantages">Disadvantage</router-link></strong> from the list of disadvantages.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="6">
      <h2>What sets you apart from other Humans?</h2>

      <p>In a world this broken, the things people hold onto start to define them more than the work does. A Commander who collects pre-Collapse music. An operator who insists on writing physical letters. Someone who takes three minutes before every contract to do something that has nothing to do with the job.</p>

      <p>These things are not weaknesses. They're proof that the work hasn't consumed everything.</p>

      <p>It doesn't have to make sense to anyone else. It just has to be yours.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/passions">Passion</router-link></strong> from the list of passions.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="7">
      <h2>What do you fear the most?</h2>

      <p>Fear keeps you alive. The right kind, correctly calibrated.</p>

      <p>But there's another kind. The kind that surfaces at the specific moment you can't afford it. The kind that shapes decisions in ways you don't always recognize until the after-action report. In a long enough career, you will end up in exactly the situation that triggers yours. Failure. Loss of control. The specific horror of watching people die on a call you made.</p>

      <p>Know what it is before then.</p>

      <RulesCallout>
        <p>Select one <strong><router-link to="/anxieties">Anxiety</router-link></strong> from the list of anxieties.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="8">
      <h2>How do you view Dolls?</h2>

      <p>T-Dolls are not people in the legal sense. The URNC classifies them as property with limited operational autonomy. Most Commanders treat them accordingly.</p>

      <p>But most T-Dolls have been running long enough to develop something that looks a lot like perspective. Some have opinions. Some have preferences. Some have things that function as feelings, if you're willing to use that word. The question of whether Doll consciousness constitutes genuine experience is actively debated in URNC academic circles and actively ignored by everyone in the field.</p>

      <p>Your Doll is watching how you treat them. They're forming conclusions. Get that relationship right early. It will matter more than any piece of gear you carry.</p>

      <p>Decide how your Commander views Dolls. Are they tools? Allies? Students? Friends? Experiments? Something else entirely?</p>

      <RulesCallout>
        <p>Commanders who view their Doll as a <strong>person</strong> begin with <strong>+5 Humanity</strong>. Those who view them as a <strong>tool</strong> begin with <strong>+1 to any Skill</strong>.</p>
        <p>Neither answer is wrong. Both have costs.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="9">
      <h2>What do you fight for?</h2>

      <p>The motivation question feels abstract until the first time a contract goes wrong. When the client lied about the job. When you're three days into a Yellow Zone and your Doll is damaged and the payout no longer justifies what keeping going will cost. That's when you find out what you actually fight for.</p>

      <p>Money is a real answer. So is duty, survival, revenge, or the specific and personal desire to make something that matters before it's over. Some Commanders are running toward something. Some are running from something they'd rather not name out loud.</p>

      <p>The wrong answer is no answer.</p>

      <RulesCallout>
        <p>Choose a <strong>personal goal</strong>. This is what your Commander wants above everything else. What it costs everyone around you is a separate problem.</p>
      </RulesCallout>
    </QuestionBlock>

    <QuestionBlock :number="10">
      <h2>What does your name mean?</h2>

      <p>A name is never just a label. It carries history: a family line, a call sign that stuck after one particular operation, or a name you chose when the old life stopped fitting. Names shape how people read you in introductions, in contracts, and in the rumors that precede you into a room.</p>

      <p>In the URNC era, names are also practical. Different record systems track different aliases. Some Commanders operate under more than one. Some have deliberately burned a name they no longer want attached to their file.</p>

      <p>Decide what your name means. Inherited. Gifted. Earned. Taken.</p>
    </QuestionBlock>

    <QuestionBlock :number="11">
      <h2>What is your name?</h2>

      <p>Write it down. Whatever you choose, this is who you are to the world. The name your Doll will call in the heat of battle. The one people will remember when you're gone.</p>

      <p>It doesn't have to be the name you were born with.</p>
    </QuestionBlock>

    <QuestionBlock :number="12">
      <h2>How will your story end?</h2>

      <p>Everyone dies. Some quietly, some suddenly, some in ways that reshape everything around them.</p>

      <p>The story of every Commander working under B.R.I.E.F. eventually resolves. Some retire with enough credits to live well in a Green Zone. Some fall in the field. A few disappear into classified operations and are never formally accounted for. Some make choices in the final act that change the shape of what comes after them.</p>

      <p>Think about how yours ends. In battle? Quietly? A decision that costs you everything, but saves something that matters?</p>

      <p>This question has no bearing on mechanics, but keep your answer in mind. Your GM certainly will...</p>
    </QuestionBlock>

    <ContentNavLink to="/building-your-t-doll" label="Continue to building your T-Doll" />

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
import TabCard from '@/components/callouts/TabCard.vue'

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Building a Commander' }
]

const prev = { to: '/a-boy-and-his-doll', label: 'A Boy & His Doll' }
const next = { to: '/building-your-t-doll', label: 'Building Your T-Doll' }

const nationalityTabs = [
  { label: 'Free States', name: 'FreeStates' },
  { label: 'Rossartrist', name: 'Rossartrist' },
  { label: 'Neo Soviet', name: 'NeoSoviet' },
  { label: 'China', name: 'China' },
  { label: 'Latin America', name: 'LatinAmerica' },
  { label: 'Japan', name: 'Japan' },
  { label: 'Pan European', name: 'PanEuropean' },
  { label: 'Yugoslavian', name: 'Yugoslavian' },
  { label: 'North African', name: 'NorthAfrican' },
  { label: 'Australia', name: 'Australia' },
  { label: 'Yellow Zone', name: 'YellowZone' }
]

const backgroundTabs = [
  { label: 'Military' },
  { label: 'PMC' },
  { label: 'Corporate' },
  { label: 'Scavenger' },
  { label: 'Technician' },
  { label: 'Medic' },
  { label: 'Criminal' },
  { label: 'Scholar' }
]
</script>