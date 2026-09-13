<template>
  <div
    class="min-h-screen bg-slate-950 text-slate-100 print:bg-white print:text-black font-sans transition-colors duration-200 selection:bg-blue-500 selection:text-white print:selection:bg-transparent"
  >
    <!-- Top Action Bar (Screen only) -->
    <header
      class="print:hidden border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div
        class="max-w-3xl w-11/12 mx-auto py-3 flex items-center justify-between gap-4"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="text-base transition-transform group-hover:-translate-x-1"
          />
          <span>{{
            currentLang === 'id' ? 'Kembali ke Portofolio' : 'Back to Portfolio'
          }}</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <!-- Language switch -->
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 transition-colors cursor-pointer"
            :title="
              currentLang === 'id'
                ? 'Switch to English'
                : 'Ganti ke Bahasa Indonesia'
            "
            @click="toggleLang"
          >
            <UIcon name="i-lucide-languages" class="text-sm text-blue-400" />
            <span>{{ currentLang === 'id' ? 'EN' : 'ID' }}</span>
          </button>

          <!-- Print button -->
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-sm"
            @click="printResume"
          >
            <UIcon name="i-lucide-printer" class="text-sm" />
            <span class="hidden sm:inline">{{
              currentLang === 'id' ? 'Cetak PDF' : 'Print PDF'
            }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Resume Paper Container -->
    <div
      class="max-w-3xl w-11/12 mx-auto py-8 sm:py-12 print:py-0 print:w-full print:max-w-full"
    >
      <main class="print:text-black">
        <!-- Header Section -->
        <section class="w-full text-center mb-8 print:mb-6">
          <h1
            class="text-3xl sm:text-4xl font-bold tracking-tight text-white print:text-black"
          >
            Bintang Murtifandy
          </h1>
          <h2
            class="text-base sm:text-lg text-blue-400 print:text-gray-800 font-medium mt-1"
          >
            {{ content.role }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-400 print:text-gray-600 mt-1">
            {{ content.location }}
          </p>

          <!-- Contact / Social Links -->
          <div
            class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm mt-3.5 print:mt-2"
          >
            <a
              href="https://bintangmurtifandy.id"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-300 hover:text-white print:text-black font-medium hover:underline print:underline"
            >
              bintangmurtifandy.id
            </a>
            <span class="text-slate-600 print:text-gray-400 select-none"
              >•</span
            >
            <a
              href="mailto:contact@bintangmurtifandy.id"
              class="text-slate-300 hover:text-white print:text-black font-medium hover:underline print:underline"
            >
              contact@bintangmurtifandy.id
            </a>
            <span class="text-slate-600 print:text-gray-400 select-none"
              >•</span
            >
            <a
              href="https://www.linkedin.com/in/bintangmurtifandy/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-300 hover:text-white print:text-black font-medium hover:underline print:underline"
            >
              LinkedIn
            </a>
            <span class="text-slate-600 print:text-gray-400 select-none"
              >•</span
            >
            <a
              href="https://github.com/byntangxyz"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-300 hover:text-white print:text-black font-medium hover:underline print:underline"
            >
              GitHub
            </a>
          </div>
        </section>

        <!-- Main Body Sections -->
        <div class="space-y-7 sm:space-y-8 print:space-y-5">
          <!-- Tentang Saya / About Me -->
          <section>
            <div
              class="flex items-center justify-between pb-2 border-b-2 border-white/20 print:border-black"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
              >
                {{ content.sections.about.title }}
              </h3>

              <!-- In-section quick actions (matching reference UI) -->
              <div class="print:hidden flex items-center gap-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center cursor-pointer px-2.5 py-0.5 rounded text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                  :title="
                    currentLang === 'id'
                      ? 'Switch to English'
                      : 'Ganti ke Bahasa Indonesia'
                  "
                  @click="toggleLang"
                >
                  <span>{{ currentLang === 'id' ? 'EN' : 'ID' }}</span>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center justify-center cursor-pointer p-1 rounded text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
                  :title="
                    currentLang === 'id' ? 'Cetak Resume' : 'Print Resume'
                  "
                  @click="printResume"
                >
                  <UIcon name="i-lucide-printer" class="text-sm" />
                </button>
              </div>
            </div>

            <div
              class="mt-3.5 space-y-2.5 text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed text-justify"
            >
              <p
                v-for="(para, idx) in content.sections.about.paragraphs"
                :key="idx"
              >
                {{ para }}
              </p>
            </div>
          </section>

          <!-- Keterampilan / Soft Skills -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.skills.title }}
            </h3>
            <ul
              class="list-disc list-inside mt-3 space-y-1 text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed"
            >
              <li
                v-for="(skill, idx) in content.sections.skills.items"
                :key="idx"
              >
                {{ skill }}
              </li>
            </ul>
          </section>

          <!-- Keterampilan Teknis / Technical Skills -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.technicalSkills.title }}
            </h3>
            <ul
              class="list-disc list-inside mt-3 space-y-1.5 text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed"
            >
              <li
                v-for="(tech, idx) in content.sections.technicalSkills.items"
                :key="idx"
              >
                <span class="font-semibold text-white print:text-black"
                  >{{ tech.category }}:</span
                >
                <span class="ml-1">{{ tech.skills }}</span>
              </li>
            </ul>
          </section>

          <!-- Pendidikan / Education -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.education.title }}
            </h3>
            <div class="mt-3.5 space-y-4">
              <div
                v-for="(edu, idx) in content.sections.education.items"
                :key="idx"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <h4
                    class="font-bold text-sm sm:text-base text-white print:text-black"
                  >
                    {{ edu.institution }}
                  </h4>
                  <span
                    class="text-xs sm:text-sm font-semibold text-slate-400 print:text-gray-700 shrink-0"
                  >
                    {{ edu.period }}
                  </span>
                </div>
                <p
                  class="text-xs sm:text-sm text-blue-400 print:text-gray-700 font-medium mt-0.5"
                >
                  {{ edu.major }}
                </p>
                <ul
                  class="list-disc list-inside mt-2 space-y-1 text-xs sm:text-sm text-slate-300 print:text-gray-800"
                >
                  <li v-for="(point, pIdx) in edu.points" :key="pIdx">
                    {{ point }}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Pengalaman / Experience -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.experience.title }}
            </h3>
            <div class="mt-3.5 space-y-4 sm:space-y-5">
              <div
                v-for="(exp, idx) in content.sections.experience.items"
                :key="idx"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <div>
                    <h4
                      class="font-bold text-sm sm:text-base text-white print:text-black"
                    >
                      {{ exp.institution }}
                    </h4>
                    <p
                      class="text-xs sm:text-sm text-blue-400 print:text-gray-700 font-medium"
                    >
                      {{ exp.role }}
                    </p>
                  </div>
                  <span
                    class="text-xs sm:text-sm font-semibold text-slate-400 print:text-gray-700 shrink-0 text-right"
                  >
                    {{ exp.period }}
                  </span>
                </div>
                <ul
                  class="list-disc list-inside mt-2 space-y-1 text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed"
                >
                  <li v-for="(resp, rIdx) in exp.responsibilities" :key="rIdx">
                    {{ resp }}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Proyek / Projects -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.projects.title }}
            </h3>
            <div class="mt-3.5 space-y-4">
              <div
                v-for="(proj, idx) in content.sections.projects.items"
                :key="idx"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <div>
                    <h4
                      class="font-bold text-sm sm:text-base text-white print:text-black inline-flex items-center gap-1.5"
                    >
                      <a
                        v-if="proj.link"
                        :href="proj.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:underline print:underline"
                      >
                        {{ proj.title }}
                      </a>
                      <span v-else>{{ proj.title }}</span>
                      <UIcon
                        v-if="proj.link"
                        name="i-lucide-external-link"
                        class="text-xs text-slate-400 print:hidden"
                      />
                    </h4>
                    <p
                      class="text-xs text-slate-400 print:text-gray-600 font-mono"
                    >
                      {{ proj.tech }}
                    </p>
                  </div>
                  <span
                    class="text-xs sm:text-sm font-semibold text-slate-400 print:text-gray-700 shrink-0"
                  >
                    {{ proj.period }}
                  </span>
                </div>
                <p
                  class="text-xs sm:text-sm text-slate-300 print:text-gray-800 mt-1 leading-relaxed"
                >
                  {{ proj.description }}
                </p>
              </div>
            </div>
          </section>

          <!-- Lisensi & Sertifikasi / Licenses & Certifications -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.certifications.title }}
            </h3>
            <div class="mt-3.5 space-y-3.5">
              <div
                v-for="(cert, idx) in content.sections.certifications.items"
                :key="idx"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <h4
                    class="font-semibold text-xs sm:text-sm text-white print:text-black"
                  >
                    {{ cert.title }}
                  </h4>
                  <span
                    class="text-xs text-slate-400 print:text-gray-600 shrink-0"
                  >
                    {{ cert.date }}
                  </span>
                </div>
                <p class="text-xs text-slate-400 print:text-gray-700">
                  {{ cert.issuer }}
                </p>
              </div>
            </div>
          </section>

          <!-- Kontak / Contact -->
          <section>
            <h3
              class="pb-2 border-b-2 border-white/20 print:border-black text-lg sm:text-xl font-bold text-white print:text-black uppercase tracking-wide"
            >
              {{ content.sections.contact.title }}
            </h3>
            <ul
              class="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-300 print:text-gray-800"
            >
              <li
                v-for="(cItem, idx) in content.sections.contact.items"
                :key="idx"
              >
                <strong class="text-white print:text-black font-semibold"
                  >{{ cItem.label }}:
                </strong>
                <a
                  v-if="cItem.link"
                  :href="cItem.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-300 hover:text-white print:text-black hover:underline print:underline ml-1"
                >
                  {{ cItem.value }}
                </a>
                <span v-else class="ml-1">{{ cItem.value }}</span>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <!-- Bottom print helper note (screen only) -->
      <footer
        class="print:hidden mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500"
      >
        <p>
          {{
            currentLang === 'id'
              ? 'Gunakan tombol Cetak PDF atau tekan Ctrl+P untuk mencetak atau menyimpan dokumen ini sebagai PDF bersih.'
              : 'Use the Print PDF button or press Ctrl+P to print or save this document as a clean PDF.'
          }}
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const currentLang = ref<'id' | 'en'>('id');

const toggleLang = () => {
  currentLang.value = currentLang.value === 'id' ? 'en' : 'id';
};

const printResume = () => {
  if (import.meta.client) {
    window.print();
  }
};

const resumeData = {
  id: {
    role: 'Fullstack Web Developer & Network Engineer',
    location: 'Sleman, Daerah Istimewa Yogyakarta, Indonesia',
    sections: {
      about: {
        title: 'Tentang Saya',
        paragraphs: [
          'Saya Bintang Murtifandy, seorang Fullstack Web Developer dan Network Engineering yang berbasis di Yogyakarta, Indonesia. Saat ini saya merupakan siswa program keahlian Sistem Informasi Jaringan dan Aplikasi (SIJA) di SMK Negeri 2 Depok Sleman (Stembayo).',
          'Perjalanan teknologi saya dimulai dari rasa ingin tahu dalam mengeksplorasi ekosistem JavaScript, yang kemudian berkembang menjadi pendalaman arsitektur fullstack, pengembangan backend, manajemen basis data, hingga pengelolaan infrastruktur jaringan dan server. Menggabungkan ranah software development dengan network engineering membuat saya menyadari bahwa setiap komponen saling terhubung erat: mampu membangun aplikasi web yang handal, merancang infrastruktur pendukungnya, serta mengelolanya dengan aman dan terukur.',
          'Pendekatan belajar yang selalu saya pegang: "Never stop learning and keep it slow" — meluangkan waktu untuk benar-benar memahami fondasi dan konsep teknologi secara mendalam daripada terburu-buru berpindah hal baru demi menghasilkan solusi teknis yang andal dan berkualitas.',
        ],
      },
      skills: {
        title: 'Keterampilan',
        items: [
          'Analisis dan troubleshooting masalah teknis, jaringan, dan kode secara sistematis.',
          'Keterampilan komunikasi efektif dan kerja sama kolaboratif dalam lingkungan tim.',
          'Adaptasi cepat terhadap perkembangan teknologi, framework, dan perkakas baru.',
          'Manajemen waktu, kepemimpinan inisiatif proyek, dan penentuan skala prioritas yang baik.',
          'Kemampuan belajar mandiri (autodidak) dan berorientasi pada peningkatan kualitas berkelanjutan.',
        ],
      },
      technicalSkills: {
        title: 'Keterampilan Teknis',
        items: [
          {
            category: 'Bahasa Pemrograman',
            skills:
              'JavaScript (ES6+), TypeScript, Go (Golang), Python, PHP, Bash Scripting',
          },
          {
            category: 'Frontend Development',
            skills:
              'Vue.js, Nuxt 3/4, React.js, Next.js, HTML5, CSS3, Tailwind CSS, Motion-v',
          },
          {
            category: 'Backend & Database',
            skills:
              'Node.js, Express.js, RESTful APIs, Supabase, PostgreSQL, MongoDB, MySQL, JWT Authentication',
          },
          {
            category: 'Jaringan Komputer',
            skills:
              'Routing & Switching, MikroTik RouterOS, Cisco Packet Tracer, IPv4/IPv6, VPN, Firewall, DNS Management',
          },
          {
            category: 'Infrastruktur & Virtualisasi',
            skills:
              'Proxmox VE (Hypervisor VM & LXC), Homelab Server Management, Administrasi Linux Server (Ubuntu/Debian)',
          },
          {
            category: 'DevOps & Tooling',
            skills:
              'Docker, Git & GitHub, CI/CD Pipeline, GitHub Actions, Nginx, Cloudflare',
          },
        ],
      },
      education: {
        title: 'Pendidikan',
        items: [
          {
            institution: 'SMK Negeri 2 Depok Sleman (Stembayo)',
            period: '2024 - Sekarang',
            major: 'Sistem Informasi Jaringan dan Aplikasi (SIJA)',
            points: [
              'Mendalami rekayasa perangkat lunak, arsitektur web modern, dan pengelolaan basis data relasional.',
              'Mempelajari administrasi infrastruktur jaringan komputer, routing protokol, dan sistem operasi server Linux.',
              'Aktif dalam implementasi proyek komputasi awan (cloud), sistem server virtualisasi mandiri, dan Internet of Things (IoT).',
            ],
          },
        ],
      },
      experience: {
        title: 'Pengalaman',
        items: [
          {
            institution: 'SMK Negeri 2 Depok Sleman (NOC Stembayo)',
            role: 'Network Operations Center (Anggota Tim Teknis)',
            period: '2025 - Sekarang',
            responsibilities: [
              'Memantau kestabilan performa dan kelancaran infrastruktur jaringan komputer lingkungan sekolah.',
              'Melakukan troubleshooting dan investigasi kendala konektivitas jaringan serta perangkat keras.',
              'Mengonfigurasi dan mengelola perangkat jaringan (switch, router, access point) serta server operasional.',
              'Menyusun dokumentasi topologi teknis dan standar operasional pemeliharaan sistem jaringan.',
            ],
          },
          {
            institution: 'SMK Negeri 2 Depok Sleman',
            role: 'Siswa Informatika / Sistem Informasi Jaringan dan Aplikasi',
            period: '2024 - Sekarang',
            responsibilities: [
              'Mengembangkan berbagai aplikasi web fullstack mandiri maupun kolaboratif berbasis standar industri.',
              'Merancang dan memelihara infrastruktur homelab server (PVE Pakem) untuk hosting multi-layanan.',
            ],
          },
        ],
      },
      projects: {
        title: 'Proyek Pilihan',
        items: [
          {
            title: 'Website & Portofolio Pribadi (bintangmurtifandy.id)',
            tech: 'Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Motion-v, Supabase',
            period: '2025 - Sekarang',
            description:
              'Website portofolio pribadi modern dan interaktif dengan desain responsif, animasi dinamis, integrasi database Supabase untuk buku tamu, dan performa tinggi.',
            link: 'https://github.com/byntangxyz/portfolio-v6',
          },
          {
            title: 'PVE Pakem (Homelab Server Infrastructure)',
            tech: 'Proxmox VE, Linux KVM, LXC Container, Virtualization, Networking',
            period: '2024 - Sekarang',
            description:
              'Proyek infrastruktur server homelab mandiri yang dipimpin bersama rekan tim, menggunakan hypervisor Proxmox VE untuk menjalankan multi-VM dan kontainer layanan.',
            link: '',
          },
          {
            title: 'SIJA Arc Website v2',
            tech: 'Next.js, React, Tailwind CSS, Framer Motion',
            period: '2024 - 2025',
            description:
              'Website portal resmi angkatan ke-28 SIJA A SMKN 2 Depok Sleman untuk memuat profil kelas, galeri kegiatan, dan arsip digital siswa.',
            link: 'https://github.com/byntangxyz/sijaarc-class',
          },
          {
            title: 'MERN Auth Template',
            tech: 'MongoDB, Express.js, React, Node.js, JWT, Tailwind CSS',
            period: '2024',
            description:
              'Template autentikasi fullstack dengan proteksi JSON Web Token, otorisasi berbasis hak akses (RBAC), dan struktur kode yang siap produksi.',
            link: 'https://github.com/byntangxyz/fullstack-js-with-auth',
          },
          {
            title: 'HololiveID Gen 3 3D Viewer',
            tech: 'React, Three.js, 3D Rendering, Tailwind CSS',
            period: '2024',
            description:
              'Aplikasi penampil model 3D interaktif karakter animasi generasi ke-3 Hololive Indonesia dengan optimasi visual dan kontrol kamera.',
            link: 'https://github.com/byntangxyz/hololive-id-gen3',
          },
        ],
      },
      certifications: {
        title: 'Lisensi & Sertifikasi',
        items: [
          {
            title: 'MikroTik Certified Network Associate (MTCNA)',
            issuer: 'MikroTik',
            date: '2026',
          },
          {
            title: 'Google Professional AI',
            issuer: 'Google',
            date: '2026',
          },
        ],
      },
      contact: {
        title: 'Kontak',
        items: [
          {
            label: 'Website',
            value: 'bintangmurtifandy.id',
            link: 'https://bintangmurtifandy.id',
          },
          {
            label: 'Email',
            value: 'contact@bintangmurtifandy.id',
            link: 'mailto:contact@bintangmurtifandy.id',
          },
          {
            label: 'LinkedIn',
            value: 'linkedin.com/in/bintangmurtifandy',
            link: 'https://www.linkedin.com/in/bintangmurtifandy/',
          },
          {
            label: 'GitHub',
            value: 'github.com/byntangxyz',
            link: 'https://github.com/byntangxyz',
          },
          {
            label: 'Instagram',
            value: '@byntangxyz',
            link: 'https://instagram.com/byntangxyz',
          },
          {
            label: 'Discord',
            value: 'byntangxyz_',
            link: '',
          },
        ],
      },
    },
  },
  en: {
    role: 'Fullstack Web Developer & Network Engineer',
    location: 'Special Region of Yogyakarta, Indonesia',
    sections: {
      about: {
        title: 'About Me',
        paragraphs: [
          'I am Bintang Murtifandy, a Fullstack Web Developer and Network Engineering based in Special Region of Yogyakarta, Indonesia. Currently studying Information Systems, Networks, and Applications (SIJA) at SMK Negeri 2 Depok Sleman (Stembayo).',
          'My journey began with a curiosity about the JavaScript ecosystem, which gradually expanded into mastering fullstack architecture, backend engineering, database management, and network infrastructure. Combining software development with network engineering made me realize that everything is interconnected: building resilient web applications, designing the underlying infrastructure, and deploying them securely at scale.',
          'My core philosophy: "Never stop learning and keep it slow" — taking the dedicated time to truly grasp fundamentals and architectural concepts thoroughly rather than rushing into trends.',
        ],
      },
      skills: {
        title: 'Core Competencies',
        items: [
          'Systematic technical troubleshooting and problem-solving across software and network layers.',
          'Effective communication and collaborative teamwork in cross-functional project environments.',
          'Rapid adaptability to emerging tools, frameworks, and modern technologies.',
          'Structured time management, project leadership initiative, and workload prioritization.',
          'Dedicated self-driven continuous learning and passion for technical excellence.',
        ],
      },
      technicalSkills: {
        title: 'Technical Skills',
        items: [
          {
            category: 'Programming Languages',
            skills: 'JavaScript (ES6+), TypeScript, Go (Golang), Python, PHP',
          },
          {
            category: 'Frontend Development',
            skills:
              'Vue.js, Nuxt 3/4, React.js, Next.js, HTML5, CSS3, Tailwind CSS, Motion-v',
          },
          {
            category: 'Backend & Databases',
            skills:
              'Node.js, Express.js, RESTful APIs, Supabase, PostgreSQL, MongoDB, MySQL, JWT Auth',
          },
          {
            category: 'Networking',
            skills:
              'Routing & Switching, MikroTik RouterOS, Cisco Packet Tracer, IPv4/IPv6, VPN, Firewall, DNS Management',
          },
          {
            category: 'Infrastructure & Virtualization',
            skills:
              'Proxmox VE (VM & LXC Hypervisor), Homelab Server Management, Linux Administration (Ubuntu/Debian)',
          },
          {
            category: 'DevOps & Tooling',
            skills:
              'Docker, Git & GitHub, CI/CD Pipeline, GitHub Actions, Nginx, Cloudflare',
          },
        ],
      },
      education: {
        title: 'Education',
        items: [
          {
            institution: 'SMK Negeri 2 Depok Sleman (Stembayo)',
            period: '2024 - Present',
            major: 'Information Systems, Networks, and Applications (SIJA)',
            points: [
              'Specializing in software engineering, modern web architectures, and relational database systems.',
              'Studying network infrastructure administration, routing protocols, and Linux server operating systems.',
              'Actively involved in cloud computing implementations, self-hosted virtualization homelab, and IoT.',
            ],
          },
        ],
      },
      experience: {
        title: 'Experience',
        items: [
          {
            institution: 'SMK Negeri 2 Depok Sleman (NOC Stembayo)',
            role: 'Network Operations Center (Technical Team Member)',
            period: '2025 - Present',
            responsibilities: [
              'Monitoring stability and performance across campus network infrastructure.',
              'Troubleshooting connectivity issues, physical layer disruptions, and hardware configurations.',
              'Configuring network appliances (switches, routers, access points) and server infrastructure.',
              'Maintaining network topology diagrams and standard operating procedures (SOP).',
            ],
          },
          {
            institution: 'SMK Negeri 2 Depok Sleman',
            role: 'Informatics Student / SIJA',
            period: '2024 - Present',
            responsibilities: [
              'Developed fullstack web applications following modern industry architectural standards.',
              'Engineered and maintained a self-hosted homelab server (PVE Pakem) for internal services.',
            ],
          },
        ],
      },
      projects: {
        title: 'Selected Projects',
        items: [
          {
            title: 'Personal Portfolio Website (bintangmurtifandy.id)',
            tech: 'Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Motion-v, Supabase',
            period: '2025 - Present',
            description:
              'Interactive and modern personal portfolio featuring responsive design, fluid animations, Supabase-backed guestbook integration, and top-tier performance.',
            link: 'https://github.com/byntangxyz/portfolio-v6',
          },
          {
            title: 'PVE Pakem (Homelab Server Infrastructure)',
            tech: 'Proxmox VE, Linux KVM, LXC Container, Virtualization, Networking',
            period: '2024 - Present',
            description:
              'A self-hosted homelab server project co-led with peers, leveraging Proxmox VE hypervisor to orchestrate virtual machines and containerized services.',
            link: '',
          },
          {
            title: 'SIJA Arc Website v2',
            tech: 'Next.js, React, Tailwind CSS, Framer Motion',
            period: '2024 - 2025',
            description:
              'Official batch portal for 28th SIJA A SMKN 2 Depok Sleman showcasing student profiles, class events, and digital media archives.',
            link: 'https://github.com/byntangxyz/sijaarc-class',
          },
          {
            title: 'MERN Auth Template',
            tech: 'MongoDB, Express.js, React, Node.js, JWT, Tailwind CSS',
            period: '2024',
            description:
              'Production-ready fullstack authentication boilerplate featuring role-based access control (RBAC), JSON Web Tokens, and clean architecture.',
            link: 'https://github.com/byntangxyz/fullstack-js-with-auth',
          },
          {
            title: 'HololiveID Gen 3 3D Viewer',
            tech: 'React, Three.js, 3D Rendering, Tailwind CSS',
            period: '2024',
            description:
              'Interactive 3D model viewer application celebrating Hololive Indonesia Gen 3 talents with real-time rendering optimizations.',
            link: 'https://github.com/byntangxyz/hololive-id-gen3',
          },
        ],
      },
      certifications: {
        title: 'Licenses & Certifications',
        items: [
          {
            title: 'MikroTik Certified Network Associate (MTCNA)',
            issuer: 'MikroTik',
            date: '2026',
          },
          {
            title: 'Google Professional AI',
            issuer: 'Google',
            date: '2026',
          },
        ],
      },
      contact: {
        title: 'Contact',
        items: [
          {
            label: 'Website',
            value: 'bintangmurtifandy.id',
            link: 'https://bintangmurtifandy.id',
          },
          {
            label: 'Email',
            value: 'contact@bintangmurtifandy.id',
            link: 'mailto:contact@bintangmurtifandy.id',
          },
          {
            label: 'LinkedIn',
            value: 'linkedin.com/in/bintangmurtifandy',
            link: 'https://www.linkedin.com/in/bintangmurtifandy/',
          },
          {
            label: 'GitHub',
            value: 'github.com/byntangxyz',
            link: 'https://github.com/byntangxyz',
          },
          {
            label: 'Instagram',
            value: '@byntangxyz',
            link: 'https://instagram.com/byntangxyz',
          },
          {
            label: 'Discord',
            value: 'byntangxyz_',
            link: '',
          },
        ],
      },
    },
  },
};

const content = computed(() => resumeData[currentLang.value]);

useSeoMeta({
  title: 'Resume ── Bintang Murtifandy',
  description:
    'Resume dan profil profesional lengkap Bintang Murtifandy — Fullstack Web Developer & Network Engineer.',
  ogTitle: 'Resume ── Bintang Murtifandy',
  ogDescription:
    'Resume dan profil profesional lengkap Bintang Murtifandy — Fullstack Web Developer & Network Engineer.',
  twitterTitle: 'Resume ── Bintang Murtifandy',
  twitterDescription:
    'Resume dan profil profesional lengkap Bintang Murtifandy — Fullstack Web Developer & Network Engineer.',
});
</script>

<style scoped>
@media print {
  @page {
    size: A4 portrait !important;
    margin: 0.45in 0.5in !important;
  }

  :global(body) {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 10.5pt !important;
    line-height: 1.3 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  section {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 1.1rem !important;
  }

  h1,
  h2,
  h3,
  h4 {
    break-after: avoid !important;
    page-break-after: avoid !important;
  }

  .print\:hidden {
    display: none !important;
  }

  .print\:block {
    display: block !important;
  }

  .print\:text-black {
    color: #000000 !important;
  }

  .print\:border-black {
    border-color: #000000 !important;
  }

  .print\:underline {
    text-decoration: underline !important;
  }
}
</style>
