import { motion } from "framer-motion";
import churchHome from "../assets/church-home.avif";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const historySections = [
  {
    title: "Origin",
    paragraphs: [
      "The history of St. Mary's Church is intricately linked to its mother church, All Saints' Church. After the Marathas handed over Ajmer to the British in 1818, a small church was constructed near Anasagar Lake, at the current site of the CPWD office. This church, known as All Saints' Church or the Station Church, served the small European Christian community. It fell under the jurisdiction of the Bishop of Bombay, with a chaplain from St. Paul's Church, Nasirabad, visiting Ajmer, Jaipur, and Sambhar Lake.",
      "The old graveyard on Lohagal Road, with its oldest gravestone dating back to 1863, belongs to this church. Despite vandalism and the loss of old records, an old Chaplain's Register from 1869 provides significant historical insights, including the consecration of the church and cemetery on February 10, 1871, by Bishop Henry Alexander of Bombay.",
      "In 1874, Ajmer and Jaipur came under the Diocese of Calcutta. Rev. George Gothard succeeded Rev. Charles Kirk as Ajmer's first chaplain. The church committee was formed with notable members like Mr. L.S. Saunders, Dr. Murray, and Mr. J. Collet. A school for European and Eurasian children was started by the vicar and his wife.",
      "As the European Christian community grew, particularly with the arrival of the railways from Agra to Ajmer in 1875, the need for a larger church became apparent. The existing church was too far from the main residential areas. Hence, in 1878, a decision was made to build a new church on the bund of the ancient Visla Lake, built by King Visaldev, an ancestor of the last Hindu emperor of India, Prithviraj Chauhan. The chaplain of All Saints' and later St. Mary's Church also cared for European troops at Taragarh and the soldiers in the sanatorium there.",
    ],
  },
  {
    title: "St. Mary's Church",
    paragraphs: [
      "Although the decision to build a new church was made in August 1878 during Bishop Edward R. Johnson of Calcutta's visit, actual planning began in August 1883. A special committee meeting on August 29, 1883, led by the commissioner Mr. Saunders and other notable figures, initiated the request for a site and government grant. The government approved the plan, and Mr. Campbell Thomson was asked to prepare building plans. Eventually, Mr. Blood's plan was finalized and carried forward by Mr. Macdonald, Sr. Resident Engineer, under the guidance of Col. Bissett.",
      "The government sanctioned the new church scheme on October 20, 1884. Contributions included Rs. 16,575 from the railway, Rs. 3,725 from the government, and Rs. 5,000 from private subscriptions, totaling Rs. 25,300. Additional contributions came from the church building society, Commissioner L.S. Saunders, and the Maharaja of Jodhpur.",
      "The church committee selected the current site on February 19, 1885. Construction began, and by September 1887, the building was complete but lacked internal fittings. It was decided to open the church on Christmas Day with a special Bishop's license. The consecration service on December 25, 1887, was a significant event, marking the church's opening with 100 chairs from railway stores and an offertory set aside for a set of bells.",
    ],
  },
  {
    title: "Consecration",
    paragraphs: [
      "A new cemetery was selected on Nasirabad Road, present-day Bihariganj. Both the church and cemetery were consecrated by Bishop Edward R. Johnson of Calcutta on March 1, 1889. Col. Trever read the petition of consecration, and Col. Walter, the Governor General's Agent, was present. Bishop Johnson suggested marking out the ground and providing a map and index for the graves, a practice still in place.",
      "On March 2, 1889, at 8:30 am, Bishop Johnson consecrated the new church, St. Mary's. The event was attended by a large congregation, including several members of the native Christian community and clergy from outstations. Chaplain B.H. Skelton was praised for his dedication and hard work throughout the building process. The church was named after the Holy Mother, with the feast of commemoration celebrated on March 25th.",
      "By the time of the Bishop's next visit on October 14, 1892, the church was beautifully adorned, with a marble tablet inscribed with dates ready to be fixed outside the sanctuary wall. Special mention was made of the marble pulpit and lectern designed by Col. Jacob CIE. In 1893, a beautiful marble font was erected in memory of Mrs. Mushet, designed by Col. Jacob CIE.",
      "In 1894, the congregation decided to dismantle the old All Saints' Church, using its marble altar and stained glass windows in St. Mary's Church. The rest of the fittings were used for St. John's Church, Usrigate, built for the SPG Mission run by Rev. Trachand. The church also housed the colors of the Bombay Grenadiers and Ajmer Merwara Rifles, along with several old memorial plaques.",
    ],
  },
  {
    title: "Memorials and Celebrations",
    paragraphs: [
      "In 1918, a memorial service was held for Rev. H. Staunton, a former chaplain at St. Mary's Church, who died in Mesopotamia. The congregation presented a processional cross in his memory, still used today, and erected a tablet in his honor.",
      "The church celebrated its Diamond Jubilee on February 2, 1948, despite challenges following India's independence. The first Indian chaplain, the late Bishop Eric Nassir, had a deep connection with the church, with his memorial tablet erected by Dr. Constance H. David and Peter David.",
      "Two church members, Bishop S.B. Joshua and Bishop Collin C. Theodore, rose to become Bishops of the Church of North India. Bishop Eric Nassir also became the first moderator of the Church of North India.",
      "In 1987, the church celebrated its centenary. The congregation raised funds for significant repairs and maintenance, including replacing the church roof. Continuous contributions have helped maintain the church's beauty and functionality.",
    ],
  },
  {
    title: "Recent Celebrations",
    paragraphs: [
      "In January 2013, St. Mary's Church celebrated 125 glorious years, with hopes to celebrate 150 years in the near future. Despite challenges like the roof waterproofing calamity in April 2024, the congregation remains grateful for the support and blessings received.",
    ],
  },
];

function History() {
  return (
    <section className="relative overflow-x-hidden bg-[#f7f5f1] font-serif text-[#5c5c5c]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.1),transparent_28%)]" />

      <div className="relative z-10">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${churchHome})` }}
        />
        <div className="absolute inset-0 bg-[rgba(23,17,13,0.56)]" />

        <div className="relative z-10 text-white">
          <Navbar />

          <div className="mx-auto max-w-[1380px] px-4 pb-8 pt-28 sm:px-6 md:px-8 md:pb-10 md:pt-36">
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="rounded-[34px] border border-white/12 bg-[linear-gradient(135deg,rgba(19,12,8,0.76),rgba(19,12,8,0.5))] px-6 py-10 text-center shadow-[0_32px_100px_rgba(0,0,0,0.24)] backdrop-blur-[10px] md:px-10 md:py-12"
            >
              <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
                Heritage Archive
              </p>
              <h1 className="mt-4 text-[2.6rem] font-normal leading-none tracking-[-0.03em] md:text-[4rem]">
                History & Chronicles
              </h1>
              <p className="mt-6 text-[1.1rem] italic text-white/82 md:text-[1.45rem]">
                Exploring the Rich Tapestry of Our Church&apos;s Past
              </p>
              <p className="mx-auto mt-8 max-w-[780px] text-[1.02rem] italic leading-[1.9] text-white/85 md:text-[1.22rem]">
                Exploring Our Heritage: Embark on a journey through our history
                and chronicles, uncovering the pivotal events, treasured
                memories, and enduring legacies that define our story.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-[1320px] rounded-[34px] border border-[rgba(183,150,79,0.14)] bg-[rgba(255,255,255,0.9)] px-6 py-12 shadow-[0_24px_80px_rgba(83,61,28,0.1)] backdrop-blur-[8px] md:px-10 md:py-14">
          <h2 className="text-center text-[2.1rem] font-semibold leading-tight text-[#111] md:text-[3.15rem]">
            Journey Through Time: The Legacy of St. Mary&apos;s Church
          </h2>
          <div className="mx-auto mt-8 h-[4px] w-10 bg-[#b7964f]" />

          <h3 className="mt-14 text-center text-[2rem] font-semibold text-[#161616] md:text-[2.35rem]">
            History of St. Mary&apos;s Church - Ajmer
          </h3>

          <div className="mt-10 space-y-14">
            {historySections.map((section, index) => (
              <motion.section
                key={section.title}
                custom={index % 2 === 0 ? "left" : "right"}
                variants={slideInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="rounded-[30px] border border-[rgba(183,150,79,0.12)] bg-[rgba(250,247,241,0.86)] px-5 py-8 shadow-[0_18px_50px_rgba(83,61,28,0.06)] md:px-8 md:py-10"
              >
                <h4 className="text-center text-[1.85rem] font-medium text-[#555] md:text-[2.25rem]">
                  {section.title}
                </h4>
                <div className="mx-auto mt-3 h-[3px] w-10 bg-[#c9ad6d]" />
                <div className="mt-8 space-y-8 text-[1.02rem] leading-[1.9] text-[#5c5c5c] md:text-[1.18rem] md:leading-[1.9]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-[rgba(183,150,79,0.12)] bg-[rgba(250,247,241,0.86)] px-5 py-6 text-center text-[1.02rem] font-semibold text-[#525252] shadow-[0_18px_50px_rgba(83,61,28,0.06)] md:px-8 md:text-[1.18rem]">
            <p>Compiled by Dr. P. E. Erickson, Church Secretary</p>
            <p>Edited by Ashish Patrick Austin</p>
          </div>
        </div>
      </div>

      <div className="pt-8 md:pt-10">
        <Footer className="bg-[rgba(17,12,8,0.35)]" />
      </div>
      </div>
    </section>
  );
}

export default History;
