import useResumeStore from "../lib/resumeStore";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

function Resume() {
  const {
    name,
    phone,
    linkedin,
    github,
    education,
    experience,
    skills,
    projects,
    certifications,
    summaryStatement,
  } = useResumeStore();

  Font.register({
    family: "Ubuntu",
    fonts: [
      {
        src: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pLlw89CH98Ko.ttf",
      },
      {
        src: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2cp2a15UIB7Un-bOeISG3pFuAT0CnW7KOywKo.ttf",
        fontWeight: "bold",
      },
    ],
  });

  const ResumeDocument = () => (
    <Document>
      <Page
        size="A4"
        style={{
          backgroundColor: "#E4E4E4",
          padding: 10,
          fontFamily: "Ubuntu",
        }}
      >
        {!name ? (
          <Text>No resume to generate...</Text>
        ) : (
          <View>
            <Text
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {name}
            </Text>

            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 16,
                  fontSize: 12,
                  paddingTop: 20,
                  paddingBottom: 10,
                }}
              >
                <Text>{linkedin}</Text>
                <Text>{github}</Text>
                <Text>{phone}</Text>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Introduction
                </Text>
                <Text style={{ fontSize: 12 }}>{summaryStatement}</Text>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Education
                </Text>
                <Text style={{ fontSize: 12 }}>{education}</Text>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Skills</Text>
                <Text style={{ fontSize: 12 }}>{skills}</Text>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Experience
                </Text>
                <Text style={{ fontSize: 12 }}>{experience}</Text>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Projects
                </Text>
                <Text style={{ fontSize: 12 }}>{projects}</Text>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Certifications
                </Text>
                <Text style={{ fontSize: 12 }}>{certifications}</Text>
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );

  return (
    <PDFViewer className="bg-white rounded-lg max-w-[1000px] w-full h-[1000px]">
      <ResumeDocument />
    </PDFViewer>
  );
}

export default Resume;
