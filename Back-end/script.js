const BAI1_v = `moduleBAI1(Y,X);outputY;inputX;assignY=X;endmodulemoduleBAI1_test(outputwire[0:0]LEDR,inputwire[0:0]SW);BAI1DUT(.Y(LEDR[0]),.X(SW[0]));endmodule`

const BAI2A_v = `moduleBAI2A(outputwireY,inputwireA,inputwireB);assignY=A&B;endmodulemoduleBAI2A_test(outputwire[1:0]LEDR,outputwire[0:0]LEDG,inputwire[1:0]SW);assignLEDR[1:0]=SW[1:0];BAI2ADUT(.Y(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI2B_v = `moduleBAI2B(outputwireY,inputwireA,inputwireB);assignY=A|B;endmodulemoduleBAI2B_test(output[1:0]LEDR,output[0:0]LEDG,input[1:0]SW);assignLEDR[1:0]=SW[1:0];BAI2ADUT(.Y(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI2C_v = `moduleBAI2C(outputwireY,inputwireA,inputwireB,inputwireC,inputwireD);assignY=((A^B)^(C^D));endmodulemoduleBAI2C_test(output[0:3]LEDR,output[0:0]LEDG,input[0:3]SW);assignLEDR[0:3]=SW[0:3];BAI2C_DUT(.Y(LEDG[0]),.A(SW[0]),.B(SW[1]),.C(SW[2]),.D(SW[3]));endmodule`

const BAI3B_v = `moduleBAI3B(outputwireSUM,outputwireCARRY,inputwireA,inputwireB,inputwireC);wireHALF_SUM1,HALF_CARRY1,HALF_CARRY2;BAI3AHA1(HALF_SUM1,HALF_CARRY1,A,B);BAI3AHA2(SUM,HALF_CARRY2,HALF_SUM1,C);assignCARRY=HALF_CARRY1|HALF_CARRY2;endmodulemoduleBAI3A_test(output[2:0]LEDR,output[1:0]LEDG,input[2:0]SW);assignLEDR[2:0]=SW[2:0];BAI3BDUT(.SUM(LEDG[0]),.CARRY(LEDG[1]),.A(SW[2]),.B(SW[1]),.C(SW[0]));endmodule`

const BAI3C_v = `moduleBAI3C(outputreg[2:0]Y,inputwire[7:0]X,inputwireEn);always@(X,En)beginif(En)casex(X)8'b00000000:Y=3'bzzz;8'b00000001:Y=3'b000;8'b0000001x:Y=3'b001;8'b000001xx:Y=3'b010;8'b00001xxx:Y=3'b011;8'b0001xxxx:Y=3'b100;8'b001xxxxx:Y=3'b101;8'b01xxxxxx:Y=3'b110;8'b1xxxxxxx:Y=3'b111;default:Y=3'bzzz;endcaseendendmodulemoduleBAI3C_test(output[8:0]LEDR,output[2:0]LEDG,input[8:0]SW);assignLEDR[8:0]=SW[8:0];BAI3CDUT(.Y(LEDG[2:0]),.X(SW[7:0]),.En(SW[8]));endmodule`

const BAI4A_v = `moduleBAI4A(outputregQ,outputwireQbar,inputwireD,inputwireclk,inputwirerst);assignQbar=~Q;always@(posedgeclk)beginif(~rst)Q=1'b0;elseQ=D;endendmodulemoduleBAI4A_test(output[0:0]LEDR,output[1:0]LEDG,input[0:0]SW,input[1:0]KEY);assignLEDR[0]=SW[0];BAI4ADUT(.Q(LEDG[1]),.Qbar(LEDG[0]),.D(SW[0]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI4B_v = `moduleBAI4B(outputreg[3:0]Q,inputwireD,inputwireclk,inputwirerst);always@(posedgeclk)if(~rst)Q<=4'b0;elseQ<={Q[2:0],D};endmodulemoduleBAI4B_test(output[0:0]LEDR,output[3:0]LEDG,input[0:0]SW,input[1:0]KEY);assignLEDR[0]=SW[0];BAI4BDUT(.Q(LEDG[3:0]),.clk(KEY[1]),.rst(KEY[0]),.D(SW[0]));endmodule`

const BAI4C_v = `moduleBAI4C(outputwire[7:0]Q,inputwireclk,inputwirerst,inputwire[1:0]ctrl,inputwire[7:0]D);reg[7:0]S_reg,S_next;always@(posedgeclk)beginif(~rst)Sreg<=0;elseS_reg<=S_next;endalways@(ctrl,S_reg)begincase(ctrl)0:S_next=S_reg;1:Snext={D[7],S_reg[7:1]};2:Snext={S_reg[6:0],D[0]};3:Snext=D;endcaseendassignQ=S_reg:endmodulemoduleBAI4C_test(output[9:0]LEDR,output[7:0]LEDG,input[9:0]SW,input[1:0]KEY);assignLEDR[9:0]=SW[9:0];BAI4CDUT(.Q(LEDG[7:0]),.clk(KEY[1]),.rst(KEY[0]),.ctrl(SW[9:8]),.D(SW[7:0]));endmodule`

const BAI5A_v = `moduleBAI5A(output[3:0]Q,inputclk,inputrst);reg[3:0]value;always@(posedgeclk)beginif(~rst)value<=4'd0;elsevalue<=value+4'd1;endassignQ=value;endmodulemoduleBAI5A_test(output[3:0]LEDR,output[1:0)LEDG,input[1:0]KEY);assignLEDG[1:0]=KEY[1:0];BAI5ADUT(.Q(LEDR[3:0]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI5B_v = `moduleBAI5B(output[3:0]Q,inputclk,inputrst,inputup_down);reg[3:0]value;always@(posedgeclk)beginif(~rst)value<=4'h0;elseif(~up_down)value<=value+4'd1;elsevalue<=value-4'd1;endassignQ=value;endmodulemoduleBAI5B_test(output[3:0]LEDR,output[2:0]LEDG,input[1:0]KEY,input[0:0]SW);assignLEDG[1:0]=KEY[1:0];assignLEDG[2]=SW[0];BAI5BDUT(.Q(LEDR[3:0]),.clk(KEY[1]),.rst(KEY[0]),.up_down(SW[0]));endmodule`

const BAI5C_v = `moduleBAI5C(output[3:0]Q,inputclk,inputrst);reg[3:0]value;always@(posedgeclk)if(~rst)value4'b0001;elsebeginvalue<=value<<1;value[0]<=value[3];endassignQ=value;endmodulemoduleBAI5C_test(output[3:0]LEDR,output[2:0]LEDG,input[1:0]KEY);assignLEDG[1:0]=KEY[1:0];BAI5CDUT(.Q(LEDR[3:0]),.clk(KEY[1]),.rst(KEY[0]));endmodule`

const BAI6A_v = `moduleBAI6A(inputwirex,inputwirerst,inputwireclk,outputregw);parameter[2:0]A=3'b000,B=3'b001,C=3'b010,D=3'b011,E=3'b100;reg[2:0]p_state,n_state;always@(xorp_state)beginn_state=Acase(p_state)A:if(x==1'b1)n_state=B;elsen_state=A;B:if(x==1'b1)n_state=B;elsen_state=C;C:if(x==1'b1)n_state=Delsen_state=A;D:if(x==1'b1)n_state=E;elsen_state=C;E:if(x==1'b1)n_state=B;elsen_state=Cdefault:n_state=Aendcaseendalways@(xorp_state)beginw=1'b0;w=(p_state==E);endalways@(posedgeclk)beginif(~rst)p_state=Aelsep_state=n_state;endendmodulemoduleBAI6A_test(output[0:0]LEDG,input[0:0]SW,input[0:1]KEY);BAI6ADUT(.x(SW[0]),.clk(KEY[1]),.rst(KEY[0]),.w(LEDG[0]));endmodule`

const BAI6B_v = `moduleBAI6B(inputwirex,inputwireclk,inputwirerst,outputregw);parameter[1:0]A=2'b00,B=2'b01,c=2'b10,D=2'b11;reg[1:0]p_state,n_state;always@(xorp_state)n_state=A;case(p_state)A:if(x=1'b1)n_state=B;elsen_state=A;B:if(x=1'b1)n_state=B;elsen_state=C;C:if(x==1'b1)n_state=D;elsen_state=A;D:if(x==1'b1)n_state=B;elsen_state=C;default:n_state=A;endcaseendalways@(xorp_state)w=1'b0;W=(p_state==D)&(x==1'b1);endalways@(posedgeclk)beginif(~rst)p_state=A;elsep_state=n_state;endendmodulemoduleBAI6Btest(output[0:0]LEDG,input[0:0]SW,input[0:1]KEY);BAI6BDUT(.x(SW[0]),.clk(KEY[1]),.rst(KEY[0]),.w(LEDG[0]));endmodule`

const BAI6C_v = `moduleBAI6Cinputwireclk,inputwirerst,outputreg[5:0]lights);reg[2:0]state;reg[3:0]count;parameterS0=3'b000,S1=3'b001,S2=3'b010,S3=3'b011,S4=3'b100,S5=3'b101;parameterSEC5=4'b1111,SEC1=4'b0011;always@(posedgeclk)beginif(~rst)beginstate<=S0;count<=0;endelsecase(state)S0:if(count<SEC5)beginstate<=S0;count<=count+1;endelsebeginstate<=S1;count<=0;endS1:if(count<SEC1)beginstate<=S1;count<=count+1;endelsebeginstate<=S2;count<=0;endS2:if(count<SEC1)beginstate<=S2:count<=count+1;endelsebeginstate<=S3;count<=0;endS3:if(count<SEC5)beginstate<=S3;count<=count+1;endelsebeginstate<=S4:count<=0;endS4:if(count<SEC1)beginstate<=S4:count<=count+1;endelsebeginstate<=S5;count<=0;endS5:if(count<SEC1)beginstate<=S5;count<=count+1;endelsebeginstate<=S0;count<=0;enddefaultstate<=S0;endcaseendalways@(*)begincase(state)S0:lights=6'b100001;S1:lights=6'b010001;S2:lights=6'b001001;S3:lights=6'b001100;S4:lights=6'b001010;55:lights=6'b001001;defaultlights=6'b100001;endcaseendendmodulemoduleCLOCK_DIV(inputwireclk,inputwirerst,outputwireclk3reg[24:0]q;always@(posedgeclk)beginif(~rst)q<=0;elseq<=q+1;endassignclk3=q[24];endmodulemoduleBAI6C_test(inputwireCLOCK_50,inputwire[0:0]KEY,outputwire[5:0]LEDR,outputwire[0:0]LEDG);wireclk3;assignLEDG[0]=KEY[0];CLOCK_DIVU1(.clk(CLOCK_50),.rst(KEY[0]),.clk3(clk3));BAI6CU2(.clk(clk3),.rst(KEY[0]),.lights(LEDR[5:0]));endmodule`

const BAI3A_v = `moduleBAI3A(outputwireSUM,outputwireCARRY,inputwireA,inputwireB);assignSUM=A^B;assignCARRY=A&B;endmodulemoduleBAI3A_test(output[1:0]LEDR,output[1:0]LEDG,input[1:0]SW);assignLEDR[1:0]=SW[1:0];BAI3ADUT(.SUM(LEDG[1]),CARRY(LEDG[0]),.A(SW[0]),.B(SW[1]));endmodule`

const BAI1_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI1isPort(X:inSTD_LOGIC;Y:outSTD_LOGIC);endBAI1;architectureBehavioralofBAI1isbeginY<=X;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI1_testisPort(SW:inSTD_LOGIC_VECTOR(0downto0);LEDR:outSTD_LOGIC_VECTOR(0downto0));endBAI1_test;architectureBehavioralofBAI1_testiscomponentBAI1Port(X:inSTD_LOGIC;Y:outSTD_LOGIC);endcomponent;signalSW0:STD_LOGIC;signalLEDR0:STD_LOGIC;beginSW0<=SW(0);LEDR(0)<=LEDR0;DUT:BAI1Portmap(X=>SW0,Y=>LEDR0);endBehavioral;`

const BAI2A_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI2AisPort(A:inSTD_LOGIC;B:inSTD_LOGIC;Y:outSTD_LOGIC);endBAI2A;architectureBehavioralofBAI2AisbeginY<=AandB;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI2A_testisPort(SW:inSTD_LOGIC_VECTOR(1downto0);LEDR:outSTD_LOGIC_VECTOR(1downto0);LEDG:outSTD_LOGIC_VECTOR(0downto0));endBAI2A_test;architectureBehavioralofBAI2A_testiscomponentBAI2APort(A:inSTD_LOGIC;B:inSTD_LOGIC;Y:outSTD_LOGIC);endcomponent;signalSW0,SW1:STD_LOGIC;signalLEDG0:STD_LOGIC;beginSW0<=SW(0);SW1<=SW(1);LEDR<=SW;LEDG(0)<=LEDG0;DUT:BAI2APortmap(A=>SW0,B=>SW1,Y=>LEDG0);endBehavioral;`

const BAI2B_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI2BisPort(A:inSTD_LOGIC;B:inSTD_LOGIC;Y:outSTD_LOGIC);endBAI2B;architectureBehavioralofBAI2BisbeginY<=AorB;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI2B_testisPort(SW:inSTD_LOGIC_VECTOR(1downto0);LEDR:outSTD_LOGIC_VECTOR(1downto0);LEDG:outSTD_LOGIC_VECTOR(0downto0));endBAI2B_test;architectureBehavioralofBAI2B_testiscomponentBAI2BPort(A:inSTD_LOGIC;B:inSTD_LOGIC;Y:outSTD_LOGIC);endcomponent;signalSW0,SW1:STD_LOGIC;signalLEDG0:STD_LOGIC;beginSW0<=SW(0);SW1<=SW(1);LEDR<=SW;LEDG(0)<=LEDG0;DUT:BAI2BPortmap(A=>SW0,B=>SW1,Y=>LEDG0);endBehavioral;`

const BAI2C_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI2CisPort(Y:outSTD_LOGIC;A:inSTD_LOGIC;B:inSTD_LOGIC;C:inSTD_LOGIC;D:inSTD_LOGIC);endBAI2C;architectureBehavioralofBAI2CisbeginY<=(AxorB)xor(CxorD);endBehavioral;entityBAI2C_testisPort(LEDR:outSTD_LOGIC_VECTOR(3downto0);LEDG:outSTD_LOGIC_VECTOR(0downto0);SW:inSTD_LOGIC_VECTOR(3downto0));endBAI2C_test;architectureBehavioralofBAI2C_testiscomponentBAI2CPort(Y:outSTD_LOGIC;A:inSTD_LOGIC;B:inSTD_LOGIC;C:inSTD_LOGIC;D:inSTD_LOGIC);endcomponent;beginLEDR<=SW;BAI2C_DUT:BAI2CPortmap(Y=>LEDG(0),A=>SW(0),B=>SW(1),C=>SW(2),D=>SW(3));endBehavioral;`

const BAI3B_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI3BisPort(SUM:outSTD_LOGIC;CARRY:outSTD_LOGIC;A:inSTD_LOGIC;B:inSTD_LOGIC;C:inSTD_LOGIC);endBAI3B;architectureBehavioralofBAI3BissignalHALF_SUM1,HALF_CARRY1,HALF_CARRY2:STD_LOGIC;beginHA1:entitywork.BAI3Aportmap(SUM=>HALF_SUM1,CARRY=>HALF_CARRY1,A=>A,B=>B);HA2:entitywork.BAI3Aportmap(SUM=>SUM,CARRY=>HALF_CARRY2,A=>HALF_SUM1,B=>C);CARRY<=HALF_CARRY1orHALF_CARRY2;endBehavioral;entityBAI3A_testisPort(LEDR:outSTD_LOGIC_VECTOR(2downto0);LEDG:outSTD_LOGIC_VECTOR(1downto0);SW:inSTD_LOGIC_VECTOR(2downto0));endBAI3A_test;architectureBehavioralofBAI3A_testiscomponentBAI3BPort(SUM:outSTD_LOGIC;CARRY:outSTD_LOGIC;A:inSTD_LOGIC;B:inSTD_LOGIC;C:inSTD_LOGIC);endcomponent;beginLEDR<=SW;DUT:BAI3BPortmap(SUM=>LEDG(0),CARRY=>LEDG(1),A=>SW(2),B=>SW(1),C=>SW(0));endBehavioral;`

const BAI3C_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI3CisPort(Y:outSTD_LOGIC_VECTOR(2downto0);X:inSTD_LOGIC_VECTOR(7downto0);En:inSTD_LOGIC);endBAI3C;architectureBehavioralofBAI3Cisbeginprocess(X,En)beginifEn='1'thencaseXiswhen"00000000"=>Y<="ZZZ";when"00000001"=>Y<="000";when"0000001-"=>Y<="001";when"000001--"=>Y<="010";when"00001---"=>Y<="011";when"0001----"=>Y<="100";when"001-----"=>Y<="101";when"01------"=>Y<="110";when"1-------"=>Y<="111";whenothers=>Y<="ZZZ";endcase;elseY<="ZZZ";endif;endprocess;endBehavioral;entityBAI3C_testisPort(LEDR:outSTD_LOGIC_VECTOR(8downto0);LEDG:outSTD_LOGIC_VECTOR(2downto0);SW:inSTD_LOGIC_VECTOR(8downto0));endBAI3C_test;architectureBehavioralofBAI3C_testiscomponentBAI3CPort(Y:outSTD_LOGIC_VECTOR(2downto0);X:inSTD_LOGIC_VECTOR(7downto0);En:inSTD_LOGIC);endcomponent;beginLEDR<=SW;DUT:BAI3CPortmap(Y=>LEDG(2downto0),X=>SW(7downto0),En=>SW(8));endBehavioral;`

const BAI4A_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI4AisPort(Q:outSTD_LOGIC;Qbar:outSTD_LOGIC;D:inSTD_LOGIC;clk:inSTD_LOGIC;rst:inSTD_LOGIC);endBAI4A;architectureBehavioralofBAI4AisbeginQbar<=notQ;process(clk)beginifrising_edge(clk)thenifrst='0'thenQ<='0';elseQ<=D;endif;endif;endprocess;endBehavioral;entityBAI4A_testisPort(LEDR:outSTD_LOGIC_VECTOR(0downto0);LEDG:outSTD_LOGIC_VECTOR(1downto0);SW:inSTD_LOGIC_VECTOR(0downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI4A_test;architectureBehavioralofBAI4A_testiscomponentBAI4APort(Q:outSTD_LOGIC;Qbar:outSTD_LOGIC;D:inSTD_LOGIC;clk:inSTD_LOGIC;rst:inSTD_LOGIC);endcomponent;beginLEDR(0)<=SW(0);DUT:BAI4APortmap(Q=>LEDG(1),Qbar=>LEDG(0),D=>SW(0),clk=>KEY(1),rst=>KEY(0));endBehavioral;`

const BAI4B_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI4BisPort(Q:outSTD_LOGIC_VECTOR(3downto0);D:inSTD_LOGIC;clk:inSTD_LOGIC;rst:inSTD_LOGIC);endBAI4B;architectureBehavioralofBAI4Bisbeginprocess(clk,rst)beginifrst='0'thenQ<="0000";elsifrising_edge(clk)thenQ<=Q(2downto0)&D;endif;endprocess;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI4B_testisPort(LEDR:outSTD_LOGIC_VECTOR(0downto0);LEDG:outSTD_LOGIC_VECTOR(3downto0);SW:inSTD_LOGIC_VECTOR(0downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI4B_test;architectureBehavioralofBAI4B_testissignalSW_internal:STD_LOGIC;beginLEDR(0)<=SW(0);SW_internal<=SW(0);DUT:entitywork.BAI4Bportmap(Q=>LEDG,clk=>KEY(1),rst=>KEY(0),D=>SW_internal);endBehavioral;`

const BAI4C_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI4CisPort(Q:outSTD_LOGIC_VECTOR(7downto0);clk:inSTD_LOGIC;rst:inSTD_LOGIC;ctrl:inSTD_LOGIC_VECTOR(1downto0);D:inSTD_LOGIC_VECTOR(7downto0));endBAI4C;architectureBehavioralofBAI4CissignalS_reg,S_next:STD_LOGIC_VECTOR(7downto0);beginprocess(clk,rst)beginifrst='0'thenS_reg<=(others=>'0');elsifrising_edge(clk)thenS_reg<=S_next;endif;endprocess;process(ctrl,S_reg)begincasectrliswhen"00"=>S_next<=S_reg;when"01"=>S_next<=D(7)&S_reg(7downto1);when"10"=>S_next<=S_reg(6downto0)&D(0);when"11"=>S_next<=D;whenothers=>S_next<=(others=>'0');endcase;endprocess;Q<=S_reg;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI4C_testisPort(LEDR:outSTD_LOGIC_VECTOR(9downto0);LEDG:outSTD_LOGIC_VECTOR(7downto0);SW:inSTD_LOGIC_VECTOR(9downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI4C_test;architectureBehavioralofBAI4C_testisbeginLEDR<=SW;DUT:entitywork.BAI4Cportmap(Q=>LEDG,clk=>KEY(1),rst=>KEY(0),ctrl=>SW(9downto8),D=>SW(7downto0));endBehavioral;`

const BAI5A_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI5AisPort(Q:outSTD_LOGIC_VECTOR(3downto0);clk:inSTD_LOGIC;rst:inSTD_LOGIC);endBAI5A;architectureBehavioralofBAI5Aissignalvalue:STD_LOGIC_VECTOR(3downto0);beginprocess(clk,rst)beginifrst='0'thenvalue<="0000";elsifrising_edge(clk)thenvalue<=value+1;endif;endprocess;Q<=value;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI5A_testisPort(LEDR:outSTD_LOGIC_VECTOR(3downto0);LEDG:outSTD_LOGIC_VECTOR(1downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI5A_test;architectureBehavioralofBAI5A_testisbeginLEDG<=KEY;DUT:entitywork.BAI5Aportmap(Q=>LEDR,clk=>KEY(1),rst=>KEY(0));endBehavioral;`

const BAI5B_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI5BisPort(Q:outSTD_LOGIC_VECTOR(3downto0);clk:inSTD_LOGIC;rst:inSTD_LOGIC;up_down:inSTD_LOGIC);endBAI5B;architectureBehavioralofBAI5Bissignalvalue:STD_LOGIC_VECTOR(3downto0);beginprocess(clk,rst)beginifrst='0'thenvalue<="0000";elsifrising_edge(clk)thenifup_down='0'thenvalue<=value+1;elsevalue<=value-1;endif;endif;endprocess;Q<=value;endBehavioral;libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI5B_testisPort(LEDR:outSTD_LOGIC_VECTOR(3downto0);LEDG:outSTD_LOGIC_VECTOR(2downto0);KEY:inSTD_LOGIC_VECTOR(1downto0);SW:inSTD_LOGIC_VECTOR(0downto0));endBAI5B_test;architectureBehavioralofBAI5B_testisbeginLEDG(1downto0)<=KEY;LEDG(2)<=SW(0);DUT:entitywork.BAI5Bportmap(Q=>LEDR,clk=>KEY(1),rst=>KEY(0),up_down=>SW(0));endBehavioral;`

const BAI5C_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI5CisPort(Q:outSTD_LOGIC_VECTOR(3downto0);clk:inSTD_LOGIC;rst:inSTD_LOGIC);endBAI5C;architectureBehavioralofBAI5Cissignalvalue:STD_LOGIC_VECTOR(3downto0):="0001";beginprocess(clk,rst)beginifrst='0'thenvalue<="0001";elsifrising_edge(clk)thenvalue<=value(2downto0)&value(3);endif;endprocess;Q<=value;endBehavioral;entityBAI5C_testisPort(LEDR:outSTD_LOGIC_VECTOR(3downto0);LEDG:outSTD_LOGIC_VECTOR(2downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI5C_test;architectureBehavioralofBAI5C_testiscomponentBAI5CPort(Q:outSTD_LOGIC_VECTOR(3downto0);clk:inSTD_LOGIC;rst:inSTD_LOGIC);endcomponent;beginLEDG(1downto0)<=KEY(1downto0);DUT:BAI5CPortmap(Q=>LEDR(3downto0),clk=>KEY(1),rst=>KEY(0));endBehavioral;`

const BAI6A_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI6AisPort(x:inSTD_LOGIC;rst:inSTD_LOGIC;clk:inSTD_LOGIC;w:outSTD_LOGIC);endBAI6A;architectureBehavioralofBAI6Aistypestate_typeis(A,B,C,D,E);signalp_state,n_state:state_type;beginprocess(x,p_state)beginn_state<=A;casep_stateiswhenA=>ifx='1'thenn_state<=B;elsen_state<=A;endif;whenB=>ifx='1'thenn_state<=B;elsen_state<=C;endif;whenC=>ifx='1'thenn_state<=D;elsen_state<=A;endif;whenD=>ifx='1'thenn_state<=E;elsen_state<=C;endif;whenE=>ifx='1'thenn_state<=B;elsen_state<=C;endif;whenothers=>n_state<=A;endcase;endprocess;process(x,p_state)beginw<='0';ifp_state=Ethenw<='1';endif;endprocess;process(clk)beginifrising_edge(clk)thenifrst='0'thenp_state<=A;elsep_state<=n_state;endif;endif;endprocess;endBehavioral;entityBAI6A_testisPort(LEDG:outSTD_LOGIC_VECTOR(0downto0);SW:inSTD_LOGIC_VECTOR(0downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI6A_test;architectureBehavioralofBAI6A_testiscomponentBAI6APort(x:inSTD_LOGIC;rst:inSTD_LOGIC;clk:inSTD_LOGIC;w:outSTD_LOGIC);endcomponent;beginDUT:BAI6APortmap(x=>SW(0),clk=>KEY(1),rst=>KEY(0),w=>LEDG(0));endBehavioral;`

const BAI6B_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI6BisPort(x:inSTD_LOGIC;clk:inSTD_LOGIC;rst:inSTD_LOGIC;w:outSTD_LOGIC);endBAI6B;architectureBehavioralofBAI6Bistypestate_typeis(A,B,C,D);signalp_state,n_state:state_type;beginprocess(x,p_state)beginn_state<=A;casep_stateiswhenA=>ifx='1'thenn_state<=B;elsen_state<=A;endif;whenB=>ifx='1'thenn_state<=B;elsen_state<=C;endif;whenC=>ifx='1'thenn_state<=D;elsen_state<=A;endif;whenD=>ifx='1'thenn_state<=B;elsen_state<=C;endif;whenothers=>n_state<=A;endcase;endprocess;process(x,p_state)beginw<='0';ifp_state=Dandx='1'thenw<='1';endif;endprocess;process(clk)beginifrising_edge(clk)thenifrst='0'thenp_state<=A;elsep_state<=n_state;endif;endif;endprocess;endBehavioral;entityBAI6B_testisPort(LEDG:outSTD_LOGIC_VECTOR(0downto0);SW:inSTD_LOGIC_VECTOR(0downto0);KEY:inSTD_LOGIC_VECTOR(1downto0));endBAI6B_test;architectureBehavioralofBAI6B_testiscomponentBAI6BPort(x:inSTD_LOGIC;clk:inSTD_LOGIC;rst:inSTD_LOGIC;w:outSTD_LOGIC);endcomponent;beginDUT:BAI6BPortmap(x=>SW(0),clk=>KEY(1),rst=>KEY(0),w=>LEDG(0));endBehavioral;`

const BAI6C_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;useIEEE.STD_LOGIC_ARITH.ALL;useIEEE.STD_LOGIC_UNSIGNED.ALL;entityBAI6CisPort(clk:inSTD_LOGIC;rst:inSTD_LOGIC;lights:outSTD_LOGIC_VECTOR(5downto0));endBAI6C;architectureBehavioralofBAI6Cistypestate_typeis(S0,S1,S2,S3,S4,S5);signalstate:state_type;signalcount:STD_LOGIC_VECTOR(3downto0);constantSEC5:STD_LOGIC_VECTOR(3downto0):="1111";constantSEC1:STD_LOGIC_VECTOR(3downto0):="0011";beginprocess(clk,rst)beginifrst='0'thenstate<=S0;count<=(others=>'0');elsifrising_edge(clk)thencasestateiswhenS0=>ifcount<SEC5thencount<=count+1;elsestate<=S1;count<=(others=>'0');endif;whenS1=>ifcount<SEC1thencount<=count+1;elsestate<=S2;count<=(others=>'0');endif;whenS2=>ifcount<SEC1thencount<=count+1;elsestate<=S3;count<=(others=>'0');endif;whenS3=>ifcount<SEC5thencount<=count+1;elsestate<=S4;count<=(others=>'0');endif;whenS4=>ifcount<SEC1thencount<=count+1;elsestate<=S5;count<=(others=>'0');endif;whenS5=>ifcount<SEC1thencount<=count+1;elsestate<=S0;count<=(others=>'0');endif;whenothers=>state<=S0;endcase;endif;endprocess;process(state)begincasestateiswhenS0=>lights<="100001";whenS1=>lights<="010001";whenS2=>lights<="001001";whenS3=>lights<="001100";whenS4=>lights<="001010";whenS5=>lights<="001001";whenothers=>lights<="100001";endcase;endprocess;endBehavioral;entityCLOCK_DIVisPort(clk:inSTD_LOGIC;rst:inSTD_LOGIC;clk3:outSTD_LOGIC);endCLOCK_DIV;architectureBehavioralofCLOCK_DIVissignalq:STD_LOGIC_VECTOR(24downto0);beginprocess(clk,rst)beginifrst='0'thenq<=(others=>'0');elsifrising_edge(clk)thenq<=q+1;endif;endprocess;clk3<=q(24);endBehavioral;entityBAI6C_testisPort(CLOCK_50:inSTD_LOGIC;KEY:inSTD_LOGIC_VECTOR(0downto0);LEDR:outSTD_LOGIC_VECTOR(5downto0);LEDG:outSTD_LOGIC_VECTOR(0downto0));endBAI6C_test;architectureBehavioralofBAI6C_testiscomponentBAI6CPort(clk:inSTD_LOGIC;rst:inSTD_LOGIC;lights:outSTD_LOGIC_VECTOR(5downto0));endcomponent;componentCLOCK_DIVPort(clk:inSTD_LOGIC;rst:inSTD_LOGIC;clk3:outSTD_LOGIC);endcomponent;signalclk3:STD_LOGIC;beginLEDG(0)<=KEY(0);U1:CLOCK_DIVPortmap(clk=>CLOCK_50,rst=>KEY(0),clk3=>clk3);U2:BAI6CPortmap(clk=>clk3,rst=>KEY(0),lights=>LEDR);endBehavioral;`

const BAI3A_vhd = `libraryIEEE;useIEEE.STD_LOGIC_1164.ALL;entityBAI3AisPort(SUM:outSTD_LOGIC;CARRY:outSTD_LOGIC;A:inSTD_LOGIC;B:inSTD_LOGIC);endBAI3A;architectureBehavioralofBAI3AisbeginSUM<=AxorB;CARRY<=AandB;endBehavioral;entityBAI3A_testisPort(LEDR:outSTD_LOGIC_VECTOR(1downto0);LEDG:outSTD_LOGIC_VECTOR(1downto0);SW:inSTD_LOGIC_VECTOR(1downto0));endBAI3A_test;architectureBehavioralofBAI3A_testiscomponentBAI3APort(SUM:outSTD_LOGIC;CARRY:outSTD_LOGIC;A:inSTD_LOGIC;B:inSTD_LOGIC);endcomponent;beginLEDR<=SW;DUT:BAI3APortmap(SUM=>LEDG(1),CARRY=>LEDG(0),A=>SW(0),B=>SW(1));endBehavioral;`

// switch on UI
const switch_UI = document.querySelectorAll('.switch-input');

//led on UI
const led_green_UI = document.querySelectorAll(`.led-green`);

//led on UI
const led_red_UI = document.querySelectorAll('.led-red');

// Output of complie verilog code
const output = document.getElementById('Output');

//Code editor
const Code = document.getElementById("code");

//Set variable for setInterval to computing I/O 
let Io_computing;

let lab_name = "";

//save text from textarea
document.getElementById('saveButton').addEventListener('click', function () {
    // Get the text from the textarea
    let textToSave = document.getElementById('code').value;
    // Create a Blob with the text
    let textBlob = new Blob([textToSave], { type: 'text/plain' });
    // Create a link element
    let downloadLink = document.createElement('a');
    // Create a URL for the Blob and set it as the href attribute of the link
    downloadLink.href = URL.createObjectURL(textBlob);
    // Set the download attribute with a filename
    downloadLink.download = 'verilog.txt';
    // Append the link to the body (necessary for Firefox)
    document.body.appendChild(downloadLink);
    // Programmatically click the link to trigger the download
    downloadLink.click();
    // Remove the link from the document
    document.body.removeChild(downloadLink);
});

//open a file 
document.getElementById('openButton').addEventListener('click', function () {
    // Programmatically click the hidden file input element
    document.getElementById('fileInput').click();
});

// input type="file" fired by "open" button
document.getElementById('fileInput').addEventListener('change', function (event) {
    // Get the selected file
    let file = event.target.files[0];
    // Create a FileReader to read the file
    let reader = new FileReader();
    // Define the onload event handler
    reader.onload = function (e) {
        // Get the file content
        let fileContent = e.target.result;
        // Display the file content in the textarea
        document.getElementById('code').value = fileContent;
    };
    // Read the file as text
    reader.readAsText(file);
});

//function for line count
function updateLineCount() {
    const lineCountElement = document.getElementById("lines");
    // Get the number of lines from the textarea value
    const lines = Code.value.split("\n").length;
    // Clear existing line number elements
    lineCountElement.innerHTML = "";
    // Create and append line number divs
    for (let i = 1; i <= lines; i++) {
        const lineNumberDiv = document.createElement("div");
        lineNumberDiv.textContent = i;
        lineCountElement.appendChild(lineNumberDiv);
    }
}

//function to check VDHL OR VERILOG
function VHDLorVERILOG() {
    const verilogKeywords = /module|endmodule|always|assign|wire|reg/gi;
    const vhdlKeywords = /entity|architecture|signal|process|begin|end/gi;
    const verilogMatches = Code.value.match(verilogKeywords);
    const vhdlMatches = Code.value.match(vhdlKeywords);
    if (verilogMatches && verilogMatches.length > 0) {
        const regex = /module\s+(\w+)\s*\(/;
        const match = regex.exec(Code.value);
        lab_name = match[1];
        return "verilog";
    } else if (vhdlMatches && vhdlMatches.length > 0) {
        const regex = /entity\s+(\w+)\s+is/i;
        const match = regex.exec(Code.value);
        lab_name = match[1];
        return "vhdl";
    } else {
        return "Unknown";
    }
}

// function for compling verilog code
function checkLabName(lab_name, type) {
    clearInterval(Io_computing);
    const lines_with_whitespace = Code.value.split('\n');
    const lines_without_whitespace = Code.value.replace(/ /g, '').split('\n');
    if (type === "verilog") {
        if (lab_name === "BAI1") {
            checkSyntax(lab_name, BAI1_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI2A") {
            checkSyntax(lab_name, BAI2A_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI2B") {
            checkSyntax(lab_name, BAI2B_v, lines_without_whitespace, lines_with_whitespace);
        } else if (lab_name === "BAI2C") {
            checkSyntax(lab_name, BAI2C_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI3A") {
            checkSyntax(lab_name, BAI3A_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI3B") {
            checkSyntax(lab_name, BAI3B_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI3C") {
            checkSyntax(lab_name, BAI3C_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI4A") {
            checkSyntax(lab_name, BAI4A_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI4B") {
            checkSyntax(lab_name, BAI4B_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI4C") {
            checkSyntax(lab_name, BAI4C_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI5A") {
            checkSyntax(lab_name, BAI5A_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI5B") {
            checkSyntax(lab_name, BAI5B_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI5C") {
            checkSyntax(lab_name, BAI5C_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI6A") {
            checkSyntax(lab_name, BAI6A_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI6B") {
            checkSyntax(lab_name, BAI6B_v, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI6C") {
            checkSyntax(lab_name, BAI6C_v, lines_without_whitespace, lines_with_whitespace);
        }
    }
    else {
        if (lab_name === "BAI1") {
            checkSyntax(lab_name, BAI1_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI2A") {
            checkSyntax(lab_name, BAI2A_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI2B") {
            checkSyntax(lab_name, BAI2B_vhd, lines_without_whitespace, lines_with_whitespace);
        } else if (lab_name === "BAI2C") {
            checkSyntax(lab_name, BAI2C_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI3A") {
            checkSyntax(lab_name, BAI3A_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI3B") {
            checkSyntax(lab_name, BAI3B_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI3C") {
            checkSyntax(lab_name, BAI3C_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI4A") {
            checkSyntax(lab_name, BAI4A_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI4B") {
            checkSyntax(lab_name, BAI4B_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI4C") {
            checkSyntax(lab_name, BAI4C_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI5A") {
            checkSyntax(lab_name, BAI5A_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI5B") {
            checkSyntax(lab_name, BAI5B_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI5C") {
            checkSyntax(lab_name, BAI5C_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI6A") {
            checkSyntax(lab_name, BAI6A_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI6B") {
            checkSyntax(lab_name, BAI6B_vhd, lines_without_whitespace, lines_with_whitespace);
        }
        else if (lab_name === "BAI6C") {
            checkSyntax(lab_name, BAI6C_vhd, lines_without_whitespace, lines_with_whitespace);
        }
    }
}

//function for run button
function runButton() {
    rst_All_variable();
    const type = VHDLorVERILOG();
    if (lab_name === "BAI1"
        || lab_name == "BAI2A" || lab_name == "BAI2B" || lab_name == "BAI2C"
        || lab_name == "BAI3A" || lab_name == "BAI3B" || lab_name == "BAI3C"
        || lab_name == "BAI4A" || lab_name == "BAI4B" || lab_name == "BAI4C"
        || lab_name == "BAI5A" || lab_name == "BAI5B" || lab_name == "BAI5C"
        || lab_name == "BAI6A" || lab_name == "BAI6B" || lab_name == "BAI6C") {
        checkLabName(lab_name, type);
    } else {
        output.innerHTML = "";
        output.innerHTML = `The name: "${lab_name}" is not recognized`;
        return;
    }
}

//function check syntax verilog or VHD
function checkSyntax(lab_name, lab,
    linesWithoutWhitespace, linesWithWhitespace) {
    let count = 0;
    for (let i = 0; i < linesWithoutWhitespace.length; i++) {
        const currentLine = linesWithoutWhitespace[i];
        // Loop through each character in the line
        for (let j = 0; j < currentLine.length; j++) {
            const char = currentLine[j];
            if (char !== lab[count]) {
                output.innerHTML = "";
                output.innerHTML = `Name: ${lab_name}<br>
                    NameError: "${char}", in line ${i + 1}<br>
                    ${linesWithWhitespace[i]}`;
                return;
            }
            count++;
        }
    }
    if (count < lab.length) {
        output.innerHTML = "";
        output.innerHTML = `Module name: ${lab_name}<br>
                    Expected  "${lab[count]}" at the end <br>
                    `
        return;
    }
    output.innerHTML = "";
    output.innerHTML = `Compile successfully "${lab_name}"`
    // after 0.1s call function to computing output
    Io_computing = setInterval(function () { verilog(lab_name) }, 100);
}

//push button on UI
const buttons = document.querySelectorAll(".button");

// push button
let push_button = [0, 0, 0, 0];

// function keydown of push button
document.addEventListener("keydown", function (event) {
    if (event.key === "0") { // Keycode for number 1
        push_button[3] = 1;
        buttons[3].classList.add("active");
        if (lab_name === "BAI5B" || lab_name === "BAI5C"
            || lab_name === "BAI6C" || lab_name === "BAI5A"
        ) {
            led_green_UI[7].classList.add("active_ledgreen")
        }
    }
    else if (event.key === "1") { // Keycode for number 2
        push_button[2] = 1;
        buttons[2].classList.add("active");
        if (lab_name === "BAI5B" || lab_name === "BAI5C"
            || lab_name === "BAI5A") {
            led_green_UI[6].classList.add("active_ledgreen")
        }

    } else if (event.key === "2") { // Keycode for number 3
        push_button[1] = 1;
        buttons[1].classList.add("active");
    } else if (event.key === "3") { // Keycode for number 4
        push_button[0] = 1;
        buttons[0].classList.add("active");
    }
});

// function keydown of push button
document.addEventListener("keyup", function (event) {
    if (event.key === "0") { // Keycode for number 1
        push_button[3] = 0;
        buttons[3].classList.remove("active");
        if (lab_name === "BAI5B" || lab_name === "BAI5C"
            || lab_name === "BAI6C" || lab_name === "BAI5A") {
            led_green_UI[7].classList.remove("active_ledgreen")
        }
    }
    else if (event.key === "1") { // Keycode for number 2
        push_button[2] = 0;
        buttons[2].classList.remove("active");
        if (lab_name === "BAI5B" || lab_name === "BAI5C" || lab_name === "BAI5A") {
            led_green_UI[6].classList.remove("active_ledgreen")
        }
    } else if (event.key === "2") { // Keycode for number 3
        push_button[1] = 0;
        buttons[1].classList.remove("active");
    } else if (event.key === "3") { // Keycode for number 4
        push_button[0] = 0;
        buttons[0].classList.remove("active");
    }
});

//function touch on mobile
function onTouch(e, id) {
    const type = e.type;
    if (type == "touchstart") {
        if (id == 0) {
            push_button[0] = 1;
            buttons[0].classList.add("active");
        }
        else if (id == 1) {
            push_button[1] = 1;
            buttons[1].classList.add("active");
        }
        else if (id == 2) {
            push_button[2] = 1;
            buttons[2].classList.add("active");
            if (lab_name === "BAI5B" || lab_name === "BAI5C"
                || lab_name === "BAI5A") {
                led_green_UI[6].classList.add("active_ledgreen")
            }
        }
        else if (id == 3) {
            push_button[3] = 1;
            buttons[3].classList.add("active");
            if (lab_name === "BAI5B" || lab_name === "BAI5C"
                || lab_name === "BAI6C" || lab_name === "BAI5A"
            ) {
                led_green_UI[7].classList.add("active_ledgreen")
            }
        }
    }
    else if (type == "touchmove" || type == "touchend") {
        if (id == 0) {
            push_button[0] = 0;
            buttons[0].classList.remove("active");
        }
        else if (id == 1) {
            push_button[1] = 0;
            buttons[1].classList.remove("active");
        }
        else if (id == 2) {
            push_button[2] = 0;
            buttons[2].classList.remove("active");
            if (lab_name === "BAI5B" || lab_name === "BAI5C" || lab_name === "BAI5A") {
                led_green_UI[6].classList.remove("active_ledgreen")
            }
        }
        else if (id == 3) {
            push_button[3] = 0;
            buttons[3].classList.remove("active");
            if (lab_name === "BAI5B" || lab_name === "BAI5C"
                || lab_name === "BAI6C" || lab_name === "BAI5A") {
                led_green_UI[7].classList.remove("active_ledgreen")
            }
        }
    }

}


//--------------------------------------------------------------------------------------------//
//initial switch and green led
let dip_switch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let ledGreen = [0, 0, 0, 0, 0, 0, 0, 0];
let ledRed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//global variable for BAI4A
let pre_clk_BAI4A = 0;
let Q_BAI4A = 0;

//count global variable for BAI5A
let value_BAI5A = 0;
let pre_clk_BAI5A = 0;
let Q_BAI5A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// global variables for BAI6A
let p_state_BAI6A = 0
let n_state_BAI6A = 0
let pre_clk_BAI6A = 0;
let w_BAI6A = [0, 0, 0, 0, 0, 0, 0, 0];

//global variables for BAI3C
let X_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];
let En_BAI3C = 0;
let Y_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];

//global variables for BAI4B
let pre_clk_BAI4B = 0;
let Q_BAI4B = [0, 0, 0, 0, 0, 0, 0, 0];

//global variables for BAI4C
let pre_clk_BAI4C = 0;
let S_reg_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
let S_reg_pre_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
let S_next_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
let ctrl_BAI4C = [0, 0];

//global variables for BAI5B
let pre_clk_BAI5B = 0;
let value_BAI5B = 0;

//global variables for BAI5C
let pre_clk_BAI5C = 0;
let value_BAI5C = [0, 0, 0, 1];

// global variables for BAI6A
let p_state_BAI6B = 0
let n_state_BAI6B = 0
let pre_clk_BAI6B = 0;
let w_BAI6B = 0;
let x_pre_BAI6B = 0
let p_state_pre_BAI6B = 0;

// global fucntion for BAI6C
let light_BAI6C = [1, 0, 0, 0, 0, 1];
let flag_BAI6C = 2;
let delay_BAI6C = () => {
    light_BAI6C = [1, 0, 0, 0, 0, 1]
    let s0, s1, s2, s3, s4, s5;
    clearTimeout(s0);
    clearTimeout(s1);
    clearTimeout(s2);
    clearTimeout(s3);
    clearTimeout(s4);
    clearTimeout(s5);
    s0 = setTimeout(() => {
        console.log("s1");
        light_BAI6C = [0, 1, 0, 0, 0, 1];
    }, 15000);
    s1 = setTimeout(() => {
        console.log("s2");
        light_BAI6C = [0, 0, 1, 0, 0, 1];
    }, 18000)
    s2 = setTimeout(() => {
        console.log("s3");
        light_BAI6C = [0, 0, 1, 1, 0, 0];
    }, 21000)
    s3 = setTimeout(() => {
        console.log("s4");
        light_BAI6C = [0, 0, 1, 0, 1, 0];
    }, 36000)
    s4 = setTimeout(() => {
        console.log("s5");
        light_BAI6C = [0, 0, 1, 0, 0, 1];
    }, 39000)
    s5 = setTimeout(() => {
        console.log("s0");
        light_BAI6C = [1, 0, 0, 0, 0, 1];
        flag_BAI6C = 0
    }, 42000)

}

//-----------------------------------------------------------------

function rst_All_variable() {
    //initial switch and green led
    dip_switch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ledGreen = [0, 0, 0, 0, 0, 0, 0, 0];
    ledRed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //--------------------------------------------------------------------------------------------//
    //global variable for BAI4A
    pre_clk_BAI4A = 0;
    Q_BAI4A = 0;

    //count global variable for BAI5A
    value_BAI5A = 0;
    pre_clk_BAI5A = 0;
    Q_BAI5A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // global variables for BAI6A
    p_state_BAI6A = 0
    n_state_BAI6A = 0
    pre_clk_BAI6A = 0;
    w_BAI6A = [0, 0, 0, 0, 0, 0, 0, 0];

    //global variables for BAI3C
    X_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];
    En_BAI3C = 0;
    Y_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];

    //global variables for BAI4B
    pre_clk_BAI4B = 0;
    Q_BAI4B = [0, 0, 0, 0, 0, 0, 0, 0];

    //global variables for BAI4C
    pre_clk_BAI4C = 0;
    S_reg_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
    S_reg_pre_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
    S_next_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
    ctrl_BAI4C = [0, 0];

    //global variables for BAI5B
    pre_clk_BAI5B = 0;
    value_BAI5B = 0;

    //global variables for BAI5B
    pre_clk_BAI5C = 0;
    value_BAI5C = [0, 0, 0, 1];

    // global variables for BAI6B
    p_state_BAI6B = 0
    n_state_BAI6B = 0
    pre_clk_BAI6B = 0;
    w_BAI6B = 0;
    x_pre_BAI6B = 0
    p_state_pre_BAI6B = 0;

    // global fucntion for BAI6C
    light_BAI6C = [1, 0, 0, 0, 0, 1];
    flag_BAI6C = 2;

    for (let i = 0; i < switch_UI.length; i++) {
        switch_UI[i].checked = false;
    }
    for (let i = 0; i < led_green_UI.length; i++) {
        led_green_UI[i].classList.remove("active_ledgreen");
    }
    for (let i = 0; i < led_red_UI.length; i++) {
        led_red_UI[i].classList.remove("active_ledred");
    }
}
//-------------------------------------------------------------------------------------------//
//object A
const A = {
    BAI1: function (x) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        LED[17] = x;
        return LED;
    },
    BAI2A: function (A, B) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        A & B ? LED[7] = 1 : LED[7] = 0;
        return LED;
    },
    BAI3A: function (A, B) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        LED[7] = A & B
        LED[6] = A ^ B
        return LED;
    },
    BAI4A: function (rst, clk, D) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        let Q_bar = 1;

        if (clk == 1 && pre_clk_BAI4A == 0) {
            if (rst == 0) {
                Q_BAI4A = 0
            } else {
                Q_BAI4A = D;
            }
        }
        pre_clk_BAI4A = clk;
        LED[7] = Q_bar;
        LED[6] = Q_BAI4A;
        return LED;
    },
    BAI5A: function (rst, clk) {

        if (clk == 1 && pre_clk_BAI5A == 0) {
            if (rst == 0) {
                value_BAI5A = 0
            }
            else {
                (value_BAI5A < 15) ? value_BAI5A++ : value_BAI5A = 0;
                let str_binary = parseInt(value_BAI5A, 10).toString(2).padStart(4, "0");
                let q = [0, 0, 0, 0];
                for (let i = 0; i < 4; i++) {
                    q[i] = parseInt(str_binary[i], 2);
                }
                Q_BAI5A = Q_BAI5A.slice(0, 14);
                Q_BAI5A.push(...q);
            }
        }
        pre_clk_BAI5A = clk;
        return Q_BAI5A;
    },
    BAI6A: function (x, rst, clk) {
        let A = 0;//[0, 0, 0];
        let B = 1;//[0, 0, 1];
        let C = 2;//[0, 1, 0];
        let D = 3;//[0, 1, 1];
        let E = 4;//[1, 0, 0];

        if (pre_clk_BAI6A === 0 && clk === 1) {
            n_state_BAI6A = A;
            switch (p_state_BAI6A) {
                case A:
                    x ? n_state_BAI6A = B : n_state_BAI6A = A;
                    break;
                case B:
                    x ? n_state_BAI6A = B : n_state_BAI6A = C;
                    break;
                case C:
                    x ? n_state_BAI6A = D : n_state_BAI6A = A;
                    break;
                case D:
                    x ? n_state_BAI6A = E : n_state_BAI6A = C;
                    break;
                case E:
                    x ? n_state_BAI6A = B : n_state_BAI6A = C;
                    break;
                default:
                    n_state_BAI6A = A;
                    break;
            }
            if (rst === 0) {
                p_state_BAI6A = A;
            } else {
                p_state_BAI6A = n_state_BAI6A;
            }
            w_BAI6A[7] = 0;
            if (p_state_BAI6A === E) {
                w_BAI6A[7] = 1;
            }
        }
        pre_clk_BAI6A = clk;
        return w_BAI6A;
    },
    BAI2B: function (A, B) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        A | B ? LED[7] = 1 : LED[7] = 0;
        return LED;
    },
    BAI2C: function (A, B, C, D) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        LED[7] = ((A ^ B) ^ (C ^ D));
        return LED;
    },
    BAI3B: function (A, B, C) {
        let LED = [0, 0, 0, 0, 0, 0, 0, 0];
        let SUM1 = A ^ B
        let CARRY1 = A & B
        let CARRY2 = SUM1 & C
        let CARRY = CARRY1 | CARRY2
        let SUM = SUM1 ^ C

        LED[7] = SUM;
        LED[6] = CARRY;
        return LED;
    },
    BAI3C: function (X, En) {
        if (JSON.stringify(X) !== JSON.stringify(X_BAI3C)
            || En !== En_BAI3C) {
            if (En) {
                if (X[7] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 1, 1, 1];
                }
                else if (X[6] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 1, 1, 0];
                }
                else if (X[5] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 1, 0, 1];
                }
                else if (X[4] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 1, 0, 0];
                }
                else if (X[3] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 0, 1, 1];
                }
                else if (X[2] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 0, 1, 0];
                }
                else if (X[1] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 0, 0, 1];
                }
                else if (X[0] === 1) {
                    Y_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];
                }
                //b'zzz
                else {
                    Y_BAI3C = [0, 0, 0, 0, 0, 0, 0, 0];
                }
            }
        }
        X_BAI3C = X;
        En_BAI3C = En;
        console.log(X[3]);
        console.log("led: ", Y_BAI3C)
        return Y_BAI3C;
    },
    BAI4B: function (D, clk, rst) {
        if (clk !== pre_clk_BAI4B && clk === 1) {
            if (rst === 0) {
                Q_BAI4B = [0, 0, 0, 0, 0, 0, 0, 0];
            }
            else {
                let Q1 = [0, 0, 0, 0];
                let Q2 = Q_BAI4B.slice(5, 8);
                Q2.push(D);
                Q1.push(...Q2);
                Q_BAI4B = Q1;
            }
        }
        pre_clk_BAI4B = clk;
        return Q_BAI4B;
    },
    BAI4C: function (clk, rst, ctrl, D) {
        if (pre_clk_BAI4C !== clk && clk === 1) {
            if (rst === 0) {
                S_reg_BAI4C = [0, 0, 0, 0, 0, 0, 0, 0];
            }
            else {
                console.log("S_reg_BAI4C = S_next_BAI4C;");
                S_reg_pre_BAI4C = S_reg_BAI4C;
                S_reg_BAI4C = S_next_BAI4C;
            }
        }

        if (JSON.stringify(ctrl) !== JSON.stringify(ctrl_BAI4C) ||
            JSON.stringify(S_reg_BAI4C) !== JSON.stringify(S_reg_pre_BAI4C)) {
            let ctrl_temp = ctrl.join("");
            if (ctrl_temp === "00") {
                S_next_BAI4C = S_reg_BAI4C;
            }
            else if (ctrl_temp === "01") {
                let temp = S_reg_BAI4C.slice(0, 7);
                temp.unshift(D[0]);
                S_next_BAI4C = temp.slice();
            }

            else if (ctrl_temp === "10") {
                let temp = S_reg_BAI4C.slice(1, 8);
                temp.push(D[7]);
                S_next_BAI4C = temp;
            }
            else {
                S_next_BAI4C = D;
            }
        }
        ctrl_BAI4C = ctrl;
        pre_clk_BAI4C = clk;
        S_reg_pre_BAI4C = S_reg_BAI4C;
        let Q = S_reg_BAI4C;
        console.log("Q: ", Q);
        return Q;
    },
    BAI5B: function (clk, rst, up_down) {
        let LED = [0, 0, 0, 0];
        if (clk == 1 && pre_clk_BAI5B == 0) {
            if (rst == 0) {
                value_BAI5B = 0
            }
            else if (up_down === 0) {
                (value_BAI5B < 15) ? value_BAI5B++ : value_BAI5B = 0
            }
            else {
                (value_BAI5B > 0) ? value_BAI5B-- : value_BAI5B = 0
            }
        }
        pre_clk_BAI5B = clk;
        let str_binary = parseInt(value_BAI5B, 10).toString(2).padStart(4, "0");
        for (let i = 0; i < 4; i++) {
            LED[i] = parseInt(str_binary[i], 2);
        }
        return LED;
    },
    BAI5C: function (clk, rst) {
        if (clk === 1 && pre_clk_BAI5C === 0) {
            if (rst === 0) {
                value_BAI5C = [0, 0, 0, 1];
            }
            else {
                let temp = value_BAI5C[0];
                value_BAI5C = value_BAI5C.slice(1);
                value_BAI5C.push(temp);
            }
        }
        pre_clk_BAI5C = clk;

        return value_BAI5C;
    },
    BAI6B: function (clk, rst, x) {
        if (pre_clk_BAI6B === 0 && clk === 1) {
            n_state_BAI6B = 0;
            switch (p_state_BAI6B) {
                case 0:
                    x ? n_state_BAI6B = 1 : n_state_BAI6B = 0;
                    break;
                case 1:
                    x ? n_state_BAI6B = 1 : n_state_BAI6B = 2;
                    break;
                case 2:
                    x ? n_state_BAI6B = 3 : n_state_BAI6B = 0;
                    break;
                case 3:
                    x ? n_state_BAI6B = 1 : n_state_BAI6B = 2;
                    break;
                default:
                    n_state_BAI6B = 0;
                    break;
            }
            if (rst === 0) {
                p_state_BAI6B = 0;
            } else {
                p_state_pre_BAI6B = p_state_BAI6B;
                p_state_BAI6B = n_state_BAI6B;
            }
        }
        if (p_state_pre_BAI6B !== p_state_BAI6B || x_pre_BAI6B !== x) {
            w_BAI6B = 0;
            if (p_state_BAI6B === 3 && x === 1) {
                w_BAI6B = 1;
            }
        }
        x_pre_BAI6B = x;
        pre_clk_BAI6B = clk;
        return w_BAI6B;
    },
    BAI6C: function (rst) {
        if (rst === 0) {
            flag_BAI6C = 0;
            light_BAI6C = [1, 0, 0, 0, 0, 1];
        }
        if ((flag_BAI6C === 0 || flag_BAI6C === 2) && rst === 1) {
            flag_BAI6C = 1;
            delay_BAI6C();

        }
        return light_BAI6C;
    },

};
//object B
const B = {
    SW: [],
    PB: [],
    LED: [],

    passInputBtoA_and_get_output_from_A: function (a, name_module) {
        if (name_module == "BAI1" || name_module == "BAI1_test") {
            console.log("sw ", this.SW[17])
            this.LED = a.BAI1(this.SW[17]).slice()
            console.log("led: ", this.LED);
        }
        else if (name_module == "BAI2A" || name_module == "BAI2A_test") {
            this.LED = a.BAI2A(this.SW[17], this.SW[16]).slice()
        }
        else if (name_module == "BAI3A" || name_module == "BAI3A_test") {
            this.LED = a.BAI3A(this.SW[17], this.SW[16]).slice()
        }
        else if (name_module == "BAI4A" || name_module == "BAI4A_test") {
            this.LED = a.BAI4A(this.PB[3], this.PB[2], this.SW[17]).slice()
        }
        else if (name_module == "BAI5A" || name_module == "BAI5A_test") {
            this.LED = a.BAI5A(this.PB[3], this.PB[2]).slice();
        }
        else if (name_module == "BAI6A" || name_module == "BAI6A_test") {
            this.LED = a.BAI6A(this.SW[17], this.PB[3], this.PB[2]).slice()
        }
        else if (name_module == "BAI2B" || name_module == "BAI2B_test") {
            this.LED = a.BAI2B(this.SW[17], this.SW[16]).slice();
        }
        else if (name_module == "BAI2C" || name_module == "BAI2C_test") {
            this.LED = a.BAI2C(this.SW[17], this.SW[16], this.SW[15], this.SW[14]).slice();
        }
        else if (name_module == "BAI3B" || name_module == "BAI3B_test") {
            this.LED = a.BAI3B(this.SW[17 - 2], this.SW[17 - 1], this.SW[17 - 0]).slice();
        }
        else if (name_module == "BAI3C" || name_module == "BAI3C_test") {
            let x_temp = this.SW.slice(10, 18).reverse();
            this.LED = a.BAI3C(x_temp, this.SW[9]).slice();
        }
        else if (name_module == "BAI4B" || name_module == "BAI4B_test") {
            this.LED = a.BAI4B(this.SW[17], this.PB[2], this.PB[3]).slice();
        }
        else if (name_module == "BAI4C" || name_module == "BAI4C_test") {
            let ctrl = this.SW.slice(8, 10);
            let D = this.SW.slice(10, 18);
            this.LED = a.BAI4C(this.PB[2], this.PB[3], ctrl, D).slice();
        }
        else if (name_module == "BAI5B" || name_module == "BAI5B_test") {
            let temp = a.BAI5B(this.PB[2], this.PB[3], this.SW[17]).slice();
            this.LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.LED.push(...temp);
        }
        else if (name_module == "BAI5C" || name_module == "BAI5C_test") {
            let temp = a.BAI5C(this.PB[2], this.PB[3]).slice();
            this.LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.LED.push(...temp);
        }
        else if (name_module == "BAI6B" || name_module == "BAI6B_test") {
            let temp = a.BAI6B(this.PB[2], this.PB[3], this.SW[17]);
            this.LED = [0, 0, 0, 0, 0, 0, 0];
            this.LED.push(temp);
        }
        else if (name_module == "BAI6C" || name_module == "BAI6C_test") {
            console.log("pb0: ", this.PB[3])
            let temp = a.BAI6C(this.PB[3]);
            this.LED = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.LED.push(...temp);
        }
    },
    passOutputAtoC: function () {
        return this.LED;
    }
};


//object C
const C = {
    SW: [],
    PB: [],
    LED: [],

    getInputFromUser: function (dip_switch, push_button) {
        this.SW = dip_switch.slice();
        this.PB = push_button.slice();
    },
    passInputToB: function (b) {
        b.SW = this.SW.slice();
        b.PB = this.PB.slice();
        b.LED = this.LED.slice();
    },
    getOutPutfromB: function (b) {
        this.LED = b.passOutputAtoC().slice();
    }
};

// create a function to get and pass input, output 
function verilog(name_module) {
    if (name_module != "") {
        // check switch on UI is checked or not
        for (let i = 0; i < switch_UI.length; i++) {
            if (switch_UI[i].checked) {
                dip_switch[i] = 1;
                //not assign for led
                if (name_module === "BAI6B" || name_module === "BAI1") {
                }
                // assign for led red
                else if (name_module !== "BAI5B" && name_module !== "BAI5C" && name_module !== "BAI6C") {
                    led_red_UI[i].classList.add('active_ledred');
                }
                //BAI5B
                else if (name_module !== "BAI5B") {
                    if (switch_UI[17].checked) {
                        led_green_UI[5].classList.add("active_ledgreen");
                    }
                    else {
                        led_green_UI[5].classList.remove("active_ledgreen");
                    }
                }

            } else {
                dip_switch[i] = 0;
                led_red_UI[i].classList.remove('active_ledred');
            }
        }
        // C get input from user
        C.getInputFromUser(dip_switch, push_button);
        //C pass input for B
        C.passInputToB(B);
        //B pass input to A and get output from A
        B.passInputBtoA_and_get_output_from_A(A, name_module);
        //C get output from B
        C.getOutPutfromB(B);

        // toggle class active on led
        if (name_module !== "BAI5B" && name_module !== "BAI5C"
            && name_module !== "BAI6C" && name_module !== "BAI1"
            && name_module !== "BAI5A"
        ) {
            for (let i = 0; i < ledGreen.length; i++) {
                led_green_UI[i].classList.toggle('active_ledgreen', C.LED[i] === 1);
            }
        }

        else {
            for (let i = 0; i < ledRed.length; i++) {
                led_red_UI[i].classList.toggle('active_ledred', C.LED[i] === 1);
            }
        }
    }
}

// setInterval(() => {
//     name_module = "BAI6C";
//     verilog("BAI6C");
// }, 10);






