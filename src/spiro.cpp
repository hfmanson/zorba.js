#include <iostream>
#include <sstream>
#include <fstream>

#include <zorba/zorba.h>
#include <zorba/store_manager.h>
#include <zorba/serializer.h>
#include <zorba/singleton_item_sequence.h>
#include <zorba/zorba_exception.h>

using namespace zorba;

XQuery_t lQuery = 0;
static void* lStore = 0;
static Zorba* lZorba = 0;
static char* result = 0;


extern "C" {
const char*
get_file(const char* filename)
{
	std::ifstream src(filename);
	std::ostringstream dst;
	dst << src.rdbuf();
	const std::string tmp = dst.str();
	int dstsz = tmp.length() + 1;
	if (result) {
		// free previous result
		delete[] result;
	}
	result = new char[dstsz];
	std::strcpy(result, tmp.c_str());
	return result;
}
	
const char*
run_query(const char* fig)
{	
//	std::cerr << "fig = " << fig << std::endl;
	try {
		if (!lZorba) {
			std::cout << "Initializing xquery" << std::endl;
			lStore = StoreManager::getStore();
			lZorba = Zorba::getInstance(lStore);
			std::ifstream xq("data/spiro.xq");
			lQuery = lZorba->compileQuery(xq);
		}
		ItemFactory* lFactory = lZorba->getItemFactory();

		/* The item that is to be bound to the external variable */
		Item lItem = lFactory->createString(fig);

		DynamicContext* lCtx = lQuery->getDynamicContext();

		/* Actually perform the binding. */
		lCtx->setVariable("fig", lItem);
		
		// execute the query and make sure that the result is correct
		Zorba_SerializerOptions lSerOptions;
		lSerOptions.omit_xml_declaration = ZORBA_OMIT_XML_DECLARATION_YES;
		std::stringstream lResult;
		lQuery->execute(lResult, &lSerOptions);
		const std::string tmp = lResult.str();
		int dstsz = tmp.length() + 1;
		if (result) {
			// free previous result
			delete[] result;
			result = 0;
		}
		result = new char[dstsz];
		std::strcpy(result, tmp.c_str());
		return result;
	} catch ( ZorbaException& e ) {
		std::cerr <<  e << std::endl;
		return "ERROR!";
	}
}

}
